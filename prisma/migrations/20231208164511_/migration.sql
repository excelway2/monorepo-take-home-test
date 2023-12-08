-- AlterTable
CREATE SEQUENCE project_order_seq;
ALTER TABLE "Project" ALTER COLUMN "order" SET DEFAULT nextval('project_order_seq');
ALTER SEQUENCE project_order_seq OWNED BY "Project"."order";
