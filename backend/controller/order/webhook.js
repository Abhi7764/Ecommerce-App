const stripe = require("../../config/stripe");
const orderModel = require("../../models/orderModel");
const cartModel = require("../../models/cartModel");

const endpointSecret = process.env.STRIPE_END_POINT_SECRET_KEY;

const getLineItems = async (lineItems) => {
    let productItems = [];
    if (lineItems?.data?.length) {
        for (const item of lineItems.data) {
            const product = await stripe.products.retrieve(item.price.product);
            const productId = product.productId;
            const productData = {
                productId: productId,
                name: product.name,
                price: item.price.unit_amount / 100,
                quantity: item.quantity,
                image: product.images
            }
            productItems.push(productData);
        }
    }
    return productItems;
}

const webhook = async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
    const payloadString = JSON.stringify(request.body);
    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret,
    });

    try {
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }


    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id)

            const productDetails = await getLineItems(lineItems);

            const orderDetails = {
                productDetails: productDetails,
                email: session.customer_email,
                userId: session.metadata.userId,
                paymentDetails: {
                    paymentId: session.payment_intent,
                    payment_method_type: session.payment_method_types,
                    payment_status: session.payment_status,
                },
                shipping_options: session.shipping_options.map((item) => {
                    return {
                        ...item,
                        shipping_amount: item.shipping_amount / 100
                    }
                }),
                totalAmount: session.amount_total / 100,
            }

            const order = await new orderModel(orderDetails)
            const saveOrder = await order.save();
            if (saveOrder?._id) {
                const deleteCartItems = await cartModel.deleteMany({ userId: session.metadata.userId })
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    response.status(200).send();
}
module.exports = webhook;
