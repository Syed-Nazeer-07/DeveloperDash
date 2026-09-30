import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: Date;
  projectId: mongoose.Types.ObjectId;
  assignee?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    description: {
      type: String,
      required: [false],
    },
    status: {
      type: String,
      enum: ['Todo', 'In Progress', 'Completed'],
      default: 'Todo',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    dueDate: {
      type: Date,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

TaskSchema.virtual('id').get(function (this: any) {
  return this._id.toHexString();
});

export default mongoose.model<ITask>('Task', TaskSchema);
