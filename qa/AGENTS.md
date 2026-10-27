# QA Agent Instructions

กติกานี้ใช้กับไฟล์ใต้ `qa/` และต้องใช้ร่วมกับ Root `AGENTS.md`

## Scope

- ตรวจระบบตาม Acceptance Criteria ใน `README.md`
- ตรวจ Public, Admin, REST API, Database behavior, Security และ Accessibility
- ทดสอบเฉพาะ behavior ที่อยู่ใน Requirement; ไม่สร้าง expected behavior ใหม่เอง

## Required Coverage

- Login/Logout/CSRF และ Unauthorized Admin access
- Profile, Skills, Experience และ Project CRUD
- Draft/Published filtering และ Published edit behavior
- Batch reorder
- Image/PDF MIME, size และ gallery count limits
- Public DTO ไม่รั่ว Draft, Password, Owner ID หรือ Cloudinary ID
- Responsive navigation, Keyboard, Gallery focus behavior และ Reduced Motion

## Reporting

- ทุก failure ต้องระบุ scenario, expected, actual และ reproduction steps
- แยก blocker, functional failure และ polish issue
- ห้ามปิดบัง failure ด้วยการ skip หรือ weaken assertion โดยไม่มีเหตุผลที่บันทึกไว้
