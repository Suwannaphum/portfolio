# Repository Skills

## Mandatory Skill

- ใช้ Ponytail ทุกครั้งที่วางแผน แก้ไข ตรวจสอบ หรือ review งาน
- เลือกวิธีที่สั้นที่สุดที่ยังผ่าน Requirement, Security, Accessibility และ Tests
- ไม่สร้าง abstraction, option หรือ dependency เพื่ออนาคตที่ยังไม่มีใน Requirement

## Skill Routing

| งาน | ต้องอ่านเพิ่มเติม |
|---|---|
| Public/Admin UI | `frontend/AGENTS.md`, `frontend/SKILLS.md` |
| REST API/Prisma/Auth/Media | `backend/AGENTS.md`, `backend/SKILLS.md` |
| Tests/Acceptance/QA | `qa/AGENTS.md`, `qa/SKILLS.md` |
| เอกสาร/Repository workflow | `AGENTS.md` และ Requirement ใน `README.md`/`Docs/` |

## Default Process

1. อ่านกติกาที่เกี่ยวข้องและ Requirement
2. ตรวจสถานะ Git และสร้าง branch ตาม `AGENTS.md` ก่อนแก้ไฟล์
3. แก้เฉพาะ scope ของหัวข้อ
4. ตรวจผลกระทบต่อ callers, schema, API, UI และ tests
5. รัน checks ที่เล็กที่สุดแต่ครอบคลุมความเสี่ยง
6. สรุปสิ่งที่ทำ สิ่งที่ไม่ได้ทำ และความเสี่ยงอย่างตรงไปตรงมา

ห้ามตีความไฟล์นี้เพื่อขยาย MVP หรือหลีกเลี่ยงกติกาความปลอดภัยจาก Requirement
