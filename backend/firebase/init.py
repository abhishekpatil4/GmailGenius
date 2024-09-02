import firebase_admin
from firebase_admin import credentials, auth, firestore
from pathlib import Path
import os

# cred = credentials.Certificate(f"{Path.cwd()}/firebase/genius-57d8d-firebase-adminsdk-ue7u9-90656332c6.json")
creds = {
    "type": os.environ.get("type"),
    "project_id": os.environ.get("project_id"),
    "private_key_id": os.environ.get("private_key_id"),
    "private_key": os.environ.get("private_key"),
    "client_email": os.environ.get("client_email"),
    "client_id": os.environ.get("client_id"),
    "auth_uri": os.environ.get("auth_uri"),
    "token_uri": os.environ.get("token_uri"),
    "auth_provider_x509_cert_url":
    os.environ.get("auth_provider_x509_cert_url"),
    "client_x509_cert_url": os.environ.get("client_x509_cert_url"),
}
firebase_admin.initialize_app(cred)

db = firestore.client()

# def get_user_by_username(username):
#     users_ref = db.collection('users')
#     query = users_ref.where('username', '==', username).limit(1)
#     docs = query.get()

#     for doc in docs:
#         return doc.to_dict()

#     return False


def get_user_by_username(username):
    users_ref = db.collection('users')
    query = users_ref.where('uid', '==', username).limit(1)
    docs = query.get()

    for doc in docs:
        return doc.to_dict()

    return False


def update_row(uid, new_row):
    users_ref = db.collection('users')
    query = users_ref.where('uid', '==', uid).limit(1)
    docs = query.get()

    for doc in docs:
        try:
            doc.reference.update({'sheetsConfig.row': str(new_row)})
            return True
        except Exception as e:
            print(f"Error updating user row: {e}")
            return False

    print(f"User with uid {uid} not found")
    return False


def update_spreadsheet_id(username: str, spreadsheet_id: str):
    users_ref = db.collection('users')
    query = users_ref.where('username', '==', username).limit(1)
    docs = query.get()

    for doc in docs:
        try:
            doc.reference.update(
                {'sheetsConfig.spreadsheet_id': spreadsheet_id})
            print(f"Successfully updated spreadsheet_id for user {username}")
            return True
        except Exception as e:
            print(f"Error updating spreadsheet_id for user {username}: {e}")
            return False

    print(f"User {username} not found")
    return False
