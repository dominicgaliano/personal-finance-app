# from google.cloud import firestore
# from firebase_admin import credentials, initialize_app
# from firebase_functions import auth

# # Initialize Firebase Admin SDK
# cred = credentials.ApplicationDefault()
# initialize_app(cred, {'projectId': 'your-firebase-project-id'})

# # Initialize Firestore client
# db = firestore.Client()

# # Define Cloud Function
# def create_user_document(data, context):
#     # Get the UID and email of the newly created user
#     uid = data['uid']
#     email = data['email']

#     # Create a new document in the 'users' collection with the UID as the document ID
#     user_ref = db.collection('users').document(uid)
#     user_ref.set({
#         'email': email,
#         # Add more user data if needed
#     })


# # Attach the function to the Firebase Authentication trigger
# auth.user().on_create(create_user_document)
