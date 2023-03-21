import { Priority } from '../../taskForm/enums/Priority';

export const renderPriorityColor = (priority: string): string => {
  switch (priority) {
    case Priority.normal:
      return 'grey.900';
    case Priority.low:
      return 'info.light';
    case Priority.high:
      return 'error.light';
    default:
      return 'info.light';
  }
};
