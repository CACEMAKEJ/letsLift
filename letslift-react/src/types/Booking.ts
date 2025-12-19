export type Booking = {
  id: string;
  coachId: string;
  coachName: string;
  startTime: string;
  description: string;
  bookedByUserId?: string;
  bookedByUserName?: string;
};
