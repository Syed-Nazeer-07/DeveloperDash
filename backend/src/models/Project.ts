import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  status: 'Planning' | 'Active' | 'Completed' | 'On Hold';
  progress: number;
  dueDate: Date;
  user: mongoose.Types.ObjectId;
  teamMembers: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    status: {
      type: String,
      enum: ['Planning', 'Active', 'Completed', 'On Hold'],
      default: 'Planning',
    },
    progress: {
      type: Number,
      default: 0,
    },
    dueDate: {
      type: Date,
      default: Date.now, // Or whatever
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    teamMembers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

ProjectSchema.virtual('id').get(function (this: any) {
  return this._id.toHexString();
});

export default mongoose.model<IProject>('Project', ProjectSchema);
