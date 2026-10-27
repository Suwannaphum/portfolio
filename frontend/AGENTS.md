# Frontend Agent Instructions

กติกานี้ใช้กับไฟล์ใต้ `frontend/` และต้องใช้ร่วมกับ Root `AGENTS.md`

## Scope

- สร้าง Next.js + TypeScript สำหรับ Public One-page และ Admin CMS ตาม `README.md` และ `Docs/ux-ui.md`
- ใช้ shadcn/ui เป็น Component Foundation สำหรับ Form, Button, Dialog, Table และ Feedback
- ใช้ Aceternity UI เฉพาะ Visual Component เด่นบน Landing Page
- ห้ามเพิ่ม Public feature นอก MVP เช่น Blog, Search, Analytics หรือ Project Detail Page

## Required Behavior

- Public ใช้ Server-side fetch แบบ `no-store`
- Public ต้องไม่แสดงหรือ fetch Draft Project
- Admin ใช้ Same-origin `/api` proxy ไปยัง Backend
- ทุก Admin mutation ส่ง CSRF Token และแสดง Loading/Success/Error state
- Preview ใช้ Form State ใน Browser เท่านั้น และห้ามเรียก Public API เพื่อดู Draft
- ใช้ Syne, Plus Jakarta Sans และ Noto Sans Thai fallback ตาม Design Spec

## Accessibility and UI

- เป้าหมาย WCAG 2.2 AA
- ใช้ Semantic HTML, Heading hierarchy, real labels และ Accessible Names
- รองรับ Skip Link, Keyboard navigation, Focus state, Escape, Focus Trap และ Restore Focus
- รองรับ `prefers-reduced-motion` และไม่มี Horizontal Overflow บน Mobile
- Alt Text ต้องมาจากข้อมูลจริง; ห้ามใช้ข้อความ placeholder ใน Production

## Boundaries

- อย่าใส่ Business Logic หรือ Cloudinary Secret ใน Browser
- อย่าแก้ Backend contract โดยไม่อัปเดต Requirement และผู้เรียกใช้
- ใช้ components/patterns ที่มีอยู่ก่อนสร้างของใหม่
