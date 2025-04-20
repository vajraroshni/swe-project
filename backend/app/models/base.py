from datetime import datetime
from .. import db

class Base(db.Model):
    """Base model class that includes common columns and methods"""
    __abstract__ = True
    
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)

    @classmethod
    def get_by_id(cls, id):
        """Get a record by ID"""
        return cls.query.get(id)
        
    @classmethod
    def get_all(cls, is_active=True):
        """Get all active records, or all records if is_active is None"""
        if is_active is None:
            return cls.query.all()
        return cls.query.filter_by(is_active=is_active).all()
        
    def save(self):
        """Save the current record to the database"""
        db.session.add(self)
        db.session.commit()
        return self
        
    def delete(self):
        """Soft delete a record by setting is_active to False"""
        self.is_active = False
        return self.save()
        
    def hard_delete(self):
        """Hard delete a record from the database"""
        db.session.delete(self)
        db.session.commit()
        
    def to_dict(self):
        """Convert model to dictionary"""
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}