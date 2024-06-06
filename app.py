from flask import Flask, request, jsonify, render_template
import paypalrestsdk

app = Flask(__name__)

# PayPal SDK configuration
paypalrestsdk.configure({
    "mode": "sandbox",  # sandbox or live
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET"
})

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/checkout', methods=['POST'])
def checkout():
    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/payment/execute",
            "cancel_url": "http://localhost:5000/"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Membership Fee",
                    "sku": "001",
                    "price": "10.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "total": "10.00",
                "currency": "USD"
            },
            "description": "Payment for membership."
        }]
    })

    if payment.create():
        for link in payment.links:
            if link.rel == "approval_url":
                approval_url = str(link.href)
                return jsonify({'approval_url': approval_url})
    else:
        return jsonify({'error': payment.error})

@app.route('/payment/execute', methods=['GET'])
def execute():
    payment_id = request.args.get('paymentId')
    payer_id = request.args.get('PayerID')

    payment = paypalrestsdk.Payment.find(payment_id)

    if payment.execute({"payer_id": payer_id}):
        return "Payment executed successfully"
    else:
        return payment.error

if __name__ == '__main__':
    app.run(debug=True)