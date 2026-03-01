import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    matricule: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    prenom: {
      type: String,
      required: true,
      trim: true,
    },
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    dateNaissance: {
      type: Date,
      required: true,
    },
    filiere: {
      type: String,
      enum: [
        'Informatique',
        'Génie Civil',
        'Génie Mécanique',
        'Génie Électrique',
        'Mathématiques',
        'Physique',
        'Chimie',
      ],
      required: true,
    },
    niveau: {
      type: String,
      enum: ['L1', 'L2', 'L3', 'M1', 'M2'],
      required: true,
    },
    telephone: {
      type: String,
      trim: true,
    },
    adresse: {
      type: String,
      trim: true,
    },
    dateInscription: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster searches
studentSchema.index({ nom: 'text', prenom: 'text', matricule: 'text' });

export default mongoose.model('Student', studentSchema);
