# Personal Portfolio — Database Specification

เอกสารนี้เป็นข้อกำหนดฐานข้อมูลสำหรับ MVP ของ Personal Portfolio ใช้ PostgreSQL และ Prisma ORM โดยระบบมีเจ้าของ Portfolio เพียงคนเดียว

## Prisma Schema

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

enum ProjectStatus {
  DRAFT
  PUBLISHED
}

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  profile      Profile?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Profile {
  id                       String       @id @default(cuid())
  ownerId                  String       @unique
  owner                    User         @relation(fields: [ownerId], references: [id])

  name                     String
  headline                 String
  bio                      String       @db.Text
  location                 String?
  email                    String?
  availableForOpportunities Boolean      @default(false)
  avatarUrl                String?
  avatarAlt                String?
  avatarCloudinaryId       String?
  resumeUrl                String?
  resumeCloudinaryId       String?
  githubUrl                String?
  linkedinUrl              String?

  skills                   Skill[]
  experiences              Experience[]
  projects                 Project[]

  createdAt                DateTime     @default(now())
  updatedAt                DateTime     @updatedAt
}

model Skill {
  id        String   @id @default(cuid())
  profileId String
  profile   Profile  @relation(fields: [profileId], references: [id], onDelete: Cascade)

  name      String
  category  String?
  sortOrder Int      @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([profileId, sortOrder])
}

model Experience {
  id           String    @id @default(cuid())
  profileId    String
  profile      Profile   @relation(fields: [profileId], references: [id], onDelete: Cascade)

  title        String
  organization String
  type         String?
  startDate    DateTime  @db.Date
  endDate      DateTime? @db.Date
  summary      String?   @db.Text
  highlights   String[]  @default([])
  sortOrder    Int       @default(0)

  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  @@index([profileId, sortOrder])
}

model Project {
  id                   String        @id @default(cuid())
  profileId            String
  profile              Profile       @relation(fields: [profileId], references: [id], onDelete: Cascade)

  title                String
  slug                 String        @unique
  description          String        @db.Text
  techStack            String[]      @default([])
  coverImageUrl        String?
  coverImageAlt        String?
  coverCloudinaryId    String?
  projectUrl           String?
  sourceUrl            String?
  status               ProjectStatus @default(DRAFT)
  sortOrder            Int           @default(0)

  gallery              ProjectImage[]

  createdAt            DateTime      @default(now())
  updatedAt            DateTime      @updatedAt

  @@index([profileId, status, sortOrder])
}

model ProjectImage {
  id                String  @id @default(cuid())
  projectId         String
  project           Project @relation(fields: [projectId], references: [id], onDelete: Cascade)

  imageUrl          String
  cloudinaryId      String
  alt               String
  sortOrder         Int     @default(0)

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([projectId, sortOrder])
}
```

## Model Constraints

### User

- `email` ต้องไม่ซ้ำ และ Backend ต้อง normalize เป็น lowercase ก่อนบันทึก
- `passwordHash` ต้องเป็น Argon2 hash เท่านั้น ห้ามเก็บ Password แบบ Plain Text
- User มี Profile ได้สูงสุดหนึ่งรายการผ่าน `Profile.ownerId @unique`
- ไม่มี User Registration หรือ Role column ใน MVP

### Profile

- `ownerId` เป็น One-to-One กับ User
- `name`, `headline` และ `bio` เป็น Required และห้ามเป็นค่าว่างหลัง Trim
- `availableForOpportunities` เป็น Boolean ค่าเริ่มต้น `false`
- `resumeUrl` และ `resumeCloudinaryId` ต้องถูกสร้าง/อัปเดตจากการอัปโหลด Resume PDF หรือถูกล้างพร้อมกัน
- URL fields รองรับเฉพาะ `http://` และ `https://` หรือ `null`
- Profile ไม่มี Draft/Published state; การ Save มีผลกับ Public ทันที

### Skill

- `profileId` ต้องอ้างถึง Profile ที่มีอยู่
- `name` Required และต้องไม่ซ้ำภายใน Profile เดียวกันโดยไม่สนใจตัวพิมพ์เล็ก/ใหญ่
- `sortOrder` เป็นจำนวนเต็มไม่ติดลบ และอ่านเรียงจากน้อยไปมาก
- ใช้ index `[profileId, sortOrder]` สำหรับ Public read และ Reorder

> Prisma schema นี้เก็บ `name` เป็น String ธรรมดา ส่วนการป้องกันชื่อซ้ำแบบ case-insensitive ต้องทำผ่าน Backend validation และ transaction ก่อนเขียนข้อมูล

### Experience

- `title`, `organization` และ `startDate` Required
- `endDate = null` หมายถึง `Present`
- `endDate` ถ้ามีต้องไม่อยู่ก่อน `startDate`
- `sortOrder` เป็นจำนวนเต็มไม่ติดลบ
- `highlights` เก็บเป็น PostgreSQL `text[]` และค่าเริ่มต้นเป็น Array ว่าง

### Project

- `profileId` ต้องอ้างถึง Profile ที่มีอยู่
- `title`, `slug` และ `description` Required และห้ามเป็นค่าว่างหลัง Trim
- `slug` ต้องเป็น lowercase kebab-case และไม่ซ้ำทั้งระบบผ่าน `@unique`
- `status` รับเฉพาะ `DRAFT` หรือ `PUBLISHED`
- `sortOrder` เป็นจำนวนเต็มไม่ติดลบ
- `projectUrl` และ `sourceUrl` ต้องเป็น HTTP(S) URL หรือ `null`
- `coverImageAlt` ต้องมีเมื่อมี `coverImageUrl`
- การแก้ Project ที่ `PUBLISHED` ไม่มี Revision และมีผล Public ทันที
- ใช้ index `[profileId, status, sortOrder]` สำหรับ Public filtering และ Admin listing

### ProjectImage

- `projectId` ต้องอ้างถึง Project ที่มีอยู่
- การลบ Project ต้องลบ Gallery rows ใน Database ด้วย `onDelete: Cascade`
- `imageUrl`, `cloudinaryId` และ `alt` Required
- `sortOrder` เป็นจำนวนเต็มไม่ติดลบ
- ใช้ index `[projectId, sortOrder]` สำหรับ Gallery read และ Reorder
- การ Remove รูปจากข้อมูลไม่บังคับให้ลบ Asset จาก Cloudinary ทันที

## Media Rules ที่สัมพันธ์กับ Database

- รูปภาพที่รองรับคือ JPEG, PNG และ WebP ขนาดไม่เกิน 10MB
- Resume รองรับ PDF ขนาดไม่เกิน 20MB
- Project หนึ่งรายการมี Gallery ได้ไม่เกิน 10 รูป
- Cloudinary `publicId` เก็บเฉพาะใน Backend/Admin data และไม่ส่งใน Public DTO
- การลบ Media ต้องลบ Database reference ก่อน; MVP ไม่มี Orphan Media Cleanup Job

## Migration และ Seed

- ทุก schema change ต้องสร้าง Prisma migration ที่ version อยู่ใน repository
- ห้ามแก้ไข migration ที่ถูกใช้งานแล้ว ให้สร้าง migration ใหม่แทน
- Seed ต้องสร้างข้อมูลต่อไปนี้:
  - Owner User จาก `SEED_ADMIN_EMAIL` และ `SEED_ADMIN_PASSWORD`
  - Profile พร้อม `availableForOpportunities`
  - Skills อย่างน้อยหนึ่งรายการ
  - Experience อย่างน้อยหนึ่งรายการที่มี `endDate = null` และหนึ่งรายการที่มี End Date
  - Published Project อย่างน้อยหนึ่งรายการ
  - Draft Project อย่างน้อยหนึ่งรายการ
- Seed สามารถ run ซ้ำได้โดยไม่สร้างข้อมูล Demo ซ้ำ
- Seed ห้ามพิมพ์ Password หรือ Cloudinary Secret ลง Log

## Dbdiagram

```dbml
Project PersonalPortfolio {
  database_type: 'PostgreSQL'
  Note: 'Personal Portfolio - One-page + Admin CMS'
}

Enum ProjectStatus {
  DRAFT
  PUBLISHED
}

Table User {
  id varchar [pk, not null, note: 'Generated by Prisma cuid()']
  email varchar [unique, not null]
  passwordHash varchar [not null, note: 'Argon2 hash']
  createdAt timestamp(3) [not null, default: `now()`]
  updatedAt timestamp(3) [not null, note: 'Managed by Prisma @updatedAt']
}

Table Profile {
  id varchar [pk, not null, note: 'Generated by Prisma cuid()']
  ownerId varchar [unique, not null]

  name varchar [not null]
  headline varchar [not null]
  bio text [not null]
  location varchar
  email varchar
  availableForOpportunities boolean [not null, default: false]
  avatarUrl varchar
  avatarAlt varchar
  avatarCloudinaryId varchar
  resumeUrl varchar
  resumeCloudinaryId varchar
  githubUrl varchar
  linkedinUrl varchar

  createdAt timestamp(3) [not null, default: `now()`]
  updatedAt timestamp(3) [not null, note: 'Managed by Prisma @updatedAt']
}

Table Skill {
  id varchar [pk, not null, note: 'Generated by Prisma cuid()']
  profileId varchar [not null]
  name varchar [not null]
  category varchar
  sortOrder int [not null, default: 0]
  createdAt timestamp(3) [not null, default: `now()`]
  updatedAt timestamp(3) [not null, note: 'Managed by Prisma @updatedAt']

  Indexes {
    (profileId, sortOrder)
  }
}

Table Experience {
  id varchar [pk, not null, note: 'Generated by Prisma cuid()']
  profileId varchar [not null]
  title varchar [not null]
  organization varchar [not null]
  type varchar
  startDate date [not null]
  endDate date
  summary text
  highlights "text[]" [not null, default: '{}']
  sortOrder int [not null, default: 0]
  createdAt timestamp(3) [not null, default: `now()`]
  updatedAt timestamp(3) [not null, note: 'Managed by Prisma @updatedAt']

  Indexes {
    (profileId, sortOrder)
  }
}

Table Project {
  id varchar [pk, not null, note: 'Generated by Prisma cuid()']
  profileId varchar [not null]
  title varchar [not null]
  slug varchar [unique, not null]
  description text [not null]
  techStack "text[]" [not null, default: '{}']
  coverImageUrl varchar
  coverImageAlt varchar
  coverCloudinaryId varchar
  projectUrl varchar
  sourceUrl varchar
  status ProjectStatus [not null, default: 'DRAFT']
  sortOrder int [not null, default: 0]
  createdAt timestamp(3) [not null, default: `now()`]
  updatedAt timestamp(3) [not null, note: 'Managed by Prisma @updatedAt']

  Indexes {
    (profileId, status, sortOrder)
  }
}

Table ProjectImage {
  id varchar [pk, not null, note: 'Generated by Prisma cuid()']
  projectId varchar [not null]
  imageUrl varchar [not null]
  cloudinaryId varchar [not null]
  alt varchar [not null]
  sortOrder int [not null, default: 0]
  createdAt timestamp(3) [not null, default: `now()`]
  updatedAt timestamp(3) [not null, note: 'Managed by Prisma @updatedAt']

  Indexes {
    (projectId, sortOrder)
  }
}

Ref: User.id - Profile.ownerId
Ref: Profile.id < Skill.profileId
Ref: Profile.id < Experience.profileId
Ref: Profile.id < Project.profileId
Ref: Project.id < ProjectImage.projectId [delete: cascade]
```
