# QA Skills

## Test Layers

- **Unit:** validation, password hashing, filtering, reorder และ mapping
- **API E2E:** auth, CRUD, CSRF, ownership, publishing และ media upload
- **Browser Smoke:** Public navigation, Admin flow, Preview, Publish และ Gallery dialog

## Acceptance Checks

- Public fetch ใช้ `no-store` และไม่มี Draft ใน response
- Save Profile/Skills/Experience เห็นผล Public ทันที
- Published Project ที่แก้ไขแล้วเห็นผล Public ทันที
- ทุก Admin mutation ปฏิเสธ request ที่ไม่มี Auth หรือ CSRF
- Upload reject MIME/size ผิด และ Gallery เกิน 10 รูป
- Keyboard ใช้งานได้, Focus ไม่หาย และ Reduced Motion ไม่ทำให้ข้อมูลหาย

## Test Discipline

- ใช้ fixtures ที่ deterministic และล้างข้อมูล test ตามความเหมาะสม
- ตรวจทั้ง success และ failure paths
- รัน test ที่เกี่ยวข้องหลังแก้ behavior และบันทึก command/result ใน handoff
