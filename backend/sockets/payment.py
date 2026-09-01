from flask_socketio import join_room

from extensions import socketio

@socketio.on("join-payment")
def join_payment(data):
    payment_id = data["payment_id"]

    join_room(f"payment:{payment_id}")