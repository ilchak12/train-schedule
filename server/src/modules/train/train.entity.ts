import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../../common/entities/base.entity";
import { Day } from "../../common/enums/day.enum";

@Entity({name: "trains"})
export class Train extends Base{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  trainNumber: string;

  @Column()
  trainRoute: string;

  @Column({
    type: 'enum',
    enum: Day,
    array: true,
    default: [Day.MONDAY, Day.TUESDAY, Day.WEDNESDAY, Day.THURSDAY, Day.FRIDAY]
  })
  frequency: Day[];

  @Column()
  startStation: string;

  @Column()
  startArrivalTime: Date;

  @Column()
  startDepartureTime: Date;

  @Column()
  endStation: string;

  @Column()
  endArrivalTime: Date;

  @Column()
  endDepartureTime: Date;

  @Column({default: false})
  isActive: boolean;
}
