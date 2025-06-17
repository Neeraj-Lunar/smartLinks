import { Types } from 'mongoose';

export function isPopulated<T extends { _id: any }>(
  ref: Types.ObjectId | T | null | undefined,
): ref is T {
  return !!ref && typeof ref === 'object' && '_id' in ref && !(ref instanceof Types.ObjectId);
}

