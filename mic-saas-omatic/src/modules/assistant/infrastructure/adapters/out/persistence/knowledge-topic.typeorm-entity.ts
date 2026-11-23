import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('knowledge_topics')
export class KnowledgeTopicTypeOrmEntity {
  @PrimaryColumn('varchar', { length: 64 })
  id: string;

  @Column('text')
  keywordsJson: string;

  @Column('text')
  titlesJson: string;

  @Column('text')
  contentJson: string;

  @Column('text', { nullable: true })
  actionsJson: string | null;

  @Column('text', { nullable: true })
  sourcesJson: string | null;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}
