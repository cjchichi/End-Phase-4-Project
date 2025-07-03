from servermodels import db, User, StudyGroup, GroupMembership
from app import app
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

    print("Seed data inserted successfully.")
