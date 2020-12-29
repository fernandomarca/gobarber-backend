import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

import IFindAllInMonthFromProvider from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProvider from '../dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {

  create(data: ICreateAppointmentDTO): Promise<Appointment>;

  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;

  findAllInMounthProvider(data: IFindAllInMonthFromProvider): Promise<Appointment[]>;

  findAllInDayFromProvider(data: IFindAllInDayFromProvider): Promise<Appointment[]>;
}
