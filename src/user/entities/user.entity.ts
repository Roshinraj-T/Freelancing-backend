import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    Check,
  } from 'typeorm';
  
  // Role Entity
  @Entity()
  export class Role {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @Column({ nullable: true })
    createdBy: string;
  
    @Column({ nullable: true })
    updatedBy: string;
  
    @Column({ nullable: true })
    deletedBy: string;
  }
  
  // Location Entity
  @Entity()
  export class Location {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @Column({ nullable: true })
    createdBy: string;
  
    @Column({ nullable: true })
    updatedBy: string;
  
    @Column({ nullable: true })
    deletedBy: string;
  }
  
  // ExperienceLevel Entity
  @Entity()
  export class ExperienceLevel {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @Column({ nullable: true })
    createdBy: string;
  
    @Column({ nullable: true })
    updatedBy: string;
  
    @Column({ nullable: true })
    deletedBy: string;
  }
  
  // JobType Entity
  @Entity()
  export class JobType {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @Column({ nullable: true })
    createdBy: string;
  
    @Column({ nullable: true })
    updatedBy: string;
  
    @Column({ nullable: true })
    deletedBy: string;
  }
  
  // Profession Entity
  @Entity()
  export class Profession {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @Column({ nullable: true })
    createdBy: string;
  
    @Column({ nullable: true })
    updatedBy: string;
  
    @Column({ nullable: true })
    deletedBy: string;
  }
  
  // DurationOption Entity
  @Entity()
  export class DurationOption {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @Column({ nullable: true })
    createdBy: string;
  
    @Column({ nullable: true })
    updatedBy: string;
  
    @Column({ nullable: true })
    deletedBy: string;
  }
  
  // JobStatus Entity
  @Entity()
  export class JobStatus {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @Column({ nullable: true })
    createdBy: string;
  
    @Column({ nullable: true })
    updatedBy: string;
  
    @Column({ nullable: true })
    deletedBy: string;
  }
  
  // User Entity
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;
  
    @ManyToOne(() => Location)
    @JoinColumn({ name: 'locationId' })
    location: Location;
  
    @Column()
    phoneNumber: string;
  
    @ManyToOne(() => ExperienceLevel)
    @JoinColumn({ name: 'experienceLevelId' })
    experienceLevel: ExperienceLevel;
  
    @Column({nullable:true})
    rating: number;
  
    @ManyToOne(() => Role)
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @ManyToOne(() => Profession)
    @JoinColumn({ name: 'professionId' })
    profession: Role;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @Column({ nullable: true })
    createdBy: string;
  
    @Column({ nullable: true })
    updatedBy: string;
  
    @Column({ nullable: true })
    deletedBy: string;
  }
  
  // Jobs Entity
  @Entity()
  @Check(`"rating" IS NULL OR ("rating" >= 1 AND "rating" <= 5)`)
  export class Jobs {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('text')
    description: string;
  
    @ManyToOne(() => Location)
    @JoinColumn({ name: 'locationId' })
    location: Location;

    @Column()
    address : string; 
  
    @ManyToOne(() => ExperienceLevel)
    @JoinColumn({ name: 'experienceLevelId' })
    experienceLevel: ExperienceLevel;
  
    @ManyToOne(() => JobType)
    @JoinColumn({ name: 'jobTypeId' })
    jobType: JobType;
  
    @ManyToOne(() => Profession)
    @JoinColumn({ name: 'professionId' })
    profession: Profession;
  
    @ManyToOne(() => DurationOption)
    @JoinColumn({ name: 'durationOptionId' })
    durationOption: DurationOption;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'clientId' })
    client: User;
  
    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'freelancerId' })
    freelancer: User;
  
    @Column({ nullable: true })
    remarksAboutClient: string;
  
    @Column({ nullable: true })
    remarksAboutFreelancer: string;
  
    @Column({ nullable: true, type: 'int' })
    ratingForClient: number;
  
    @Column({ nullable: true, type: 'int' })
    ratingForFreelancer: number;
  
    @ManyToOne(() => JobStatus)
    @JoinColumn({ name: 'jobStatusId' })
    jobStatus: JobStatus;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @Column({ nullable: true })
    createdBy: string;
  
    @Column({ nullable: true })
    updatedBy: string;
  
    @Column({ nullable: true })
    deletedBy: string;
  }
  
  // JobApply Entity
  @Entity()
  export class JobApply {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'freelancerId' })
    freelancer: User;

    @ManyToOne(() => Jobs)
    @JoinColumn({ name: 'jobId' })
    job: Jobs;
  
    @Column({ nullable: true })
    isApplied: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @Column({ nullable: true })
    createdBy: string;
  
    @Column({ nullable: true })
    updatedBy: string;
  
    @Column({ nullable: true })
    deletedBy: string;
  }
  
