# from backend.server.models import db, User, StudyGroup, GroupMembership
# from app import app

# with app.app_context():
#     print("Seeding database...")

#     # Clear old data
#     GroupMembership.query.delete()
#     StudyGroup.query.delete()
#     User.query.delete()

#     # Users
#     u1 = User(username="alice", email="alice@example.com", password_hash="password123")
#     u2 = User(username="bob", email="bob@example.com", password_hash="password456")
#     db.session.add_all([u1, u2])
#     db.session.commit()

#     # Study Groups
#     g1 = StudyGroup(name="Flask Group", description="Learn Flask together", creator_id=u1.id)
#     g2 = StudyGroup(name="React Team", description="React crash course", creator_id=u2.id)
#     db.session.add_all([g1, g2])
#     db.session.commit()

#     # Memberships
#     m1 = GroupMembership(user_id=u1.id, study_group_id=g2.id, role="member")
#     m2 = GroupMembership(user_id=u2.id, study_group_id=g1.id, role="admin")
#     db.session.add_all([m1, m2])
#     db.session.commit()

#     print("Seeding complete.")


# from server.models import db, User, StudyGroup, GroupMembership
# from server.app import app
# from flask_bcrypt import Bcrypt
# bcrypt = Bcrypt()

# with app.app_context():
#     # Drop and recreate all tables
#     db.drop_all()
#     db.create_all()

#     # Create users
#     user1 = User(username="alice", email="alice@example.com", password_hash="alicepass")
#     user2 = User(username="bob", email="bob@example.com", password_hash="bobpass")
#     user3 = User(username="carol", email="carol@example.com", password_hash="carolpass")

#     db.session.add_all([user1, user2, user3])
#     db.session.commit()

#     # Create study groups
#     group1 = StudyGroup(name="React Beginners", description="Intro to React", creator_id=user1.id)
#     group2 = StudyGroup(name="Flask Masters", description="Advanced Flask Concepts", creator_id=user2.id)

#     db.session.add_all([group1, group2])
#     db.session.commit()

#     # Create memberships
#     m1 = GroupMembership(user_id=user1.id, study_group_id=group1.id, role="admin")
#     m2 = GroupMembership(user_id=user2.id, study_group_id=group1.id, role="member")
#     m3 = GroupMembership(user_id=user2.id, study_group_id=group2.id, role="admin")
#     m4 = GroupMembership(user_id=user3.id, study_group_id=group2.id, role="member")

#     db.session.add_all([m1, m2, m3, m4])
#     db.session.commit()

#     print("✅ Seed data inserted successfully.")


# from server.models import db, User, StudyGroup, GroupMembership
# from server.app import app
# from server.extensions import bcrypt

# with app.app_context():
#     # Drop and recreate all tables
#     db.drop_all()
#     db.create_all()

#     # Create users with hashed passwords
#     user1 = User(
#         username="alice",
#         email="alice@example.com",
#         password_hash=bcrypt.generate_password_hash("alicepass").decode("utf-8")
#     )
#     user2 = User(
#         username="bob",
#         email="bob@example.com",
#         password_hash=bcrypt.generate_password_hash("bobpass").decode("utf-8")
#     )
#     user3 = User(
#         username="carol",
#         email="carol@example.com",
#         password_hash=bcrypt.generate_password_hash("carolpass").decode("utf-8")
#     )

#     db.session.add_all([user1, user2, user3])
#     db.session.commit()

#     # Create study groups
#     group1 = StudyGroup(name="React Beginners", description="Intro to React", creator_id=user1.id)
#     group2 = StudyGroup(name="Flask Masters", description="Advanced Flask Concepts", creator_id=user2.id)

#     db.session.add_all([group1, group2])
#     db.session.commit()

#     # Create memberships
#     m1 = GroupMembership(user_id=user1.id, study_group_id=group1.id, role="admin")
#     m2 = GroupMembership(user_id=user2.id, study_group_id=group1.id, role="member")
#     m3 = GroupMembership(user_id=user2.id, study_group_id=group2.id, role="admin")
#     m4 = GroupMembership(user_id=user3.id, study_group_id=group2.id, role="member")

#     db.session.add_all([m1, m2, m3, m4])
#     db.session.commit()

#     print("✅ Seed data inserted successfully.")


from server.models import db, User, StudyGroup, GroupMembership
from server.app import app
from server.extensions import bcrypt

with app.app_context():
    # Drop and recreate all tables
    db.drop_all()
    db.create_all()

    # Create users with password "password123"
    user1 = User(
        username="alice",
        email="alice@example.com",
        password_hash=bcrypt.generate_password_hash("password123").decode("utf-8")
    )
    user2 = User(
        username="bob",
        email="bob@example.com",
        password_hash=bcrypt.generate_password_hash("password123").decode("utf-8")
    )
    user3 = User(
        username="carol",
        email="carol@example.com",
        password_hash=bcrypt.generate_password_hash("password123").decode("utf-8")
    )

    db.session.add_all([user1, user2, user3])
    db.session.commit()

    # Create study groups
    group1 = StudyGroup(name="React Beginners", description="Intro to React", creator_id=user1.id)
    group2 = StudyGroup(name="Flask Masters", description="Advanced Flask Concepts", creator_id=user2.id)

    db.session.add_all([group1, group2])
    db.session.commit()

    # Create memberships
    m1 = GroupMembership(user_id=user1.id, study_group_id=group1.id, role="admin")
    m2 = GroupMembership(user_id=user2.id, study_group_id=group1.id, role="member")
    m3 = GroupMembership(user_id=user2.id, study_group_id=group2.id, role="admin")
    m4 = GroupMembership(user_id=user3.id, study_group_id=group2.id, role="member")

    db.session.add_all([m1, m2, m3, m4])
    db.session.commit()

    print("✅ Seed data inserted successfully.")
