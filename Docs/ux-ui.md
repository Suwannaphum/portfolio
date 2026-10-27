# Personal Portfolio — Neon Mint Design Specification

> **ประเภทเอกสาร:** UI/UX Design Specification + Implementation Handoff  
> **โปรเจกต์:** Personal Portfolio — One-page + Admin CMS  
> **แนวทางหลัก:** Dark Neon Mint · Syne + Plus Jakarta Sans · Asymmetric Bento Grid · Developer / Engineer  
> **รองรับ responsive**
> **เวอร์ชัน:** 2.0 — MVP Requirements Locked

---

## 1. ภาพรวมและเป้าหมายการออกแบบ

สร้าง Personal Portfolio แบบ One-page ที่มีบุคลิกของ **Developer / Software Engineer** ชัดเจน ดูเรียบ เท่ เป็นมืออาชีพ และใช้งานง่ายสำหรับ Recruiter หรือบริษัทที่เข้ามาประเมินผลงาน พร้อม **Admin CMS** เพื่อให้เจ้าของแก้ไข Profile, Skills, Experience และ Projects ได้โดยไม่แก้ Source Code

ชื่อคอนเซปต์ที่เสนอ: **NEON MINT — Developer Workspace**

### Design goals

1. **Understand in seconds:** ผู้ชมควรทราบชื่อ/บทบาท/ความเชี่ยวชาญ และเห็นปุ่มติดต่อได้ทันที
2. **Work first:** เน้นผลงานที่เผยแพร่แล้ว พร้อม Technology Stack และลิงก์ที่เกี่ยวข้อง
3. **Readability:** สวยอย่างมีระเบียบ ใช้สี Neon Mint เป็นจุดเน้นแทนการเรืองแสงทุกพื้นที่
4. **Responsive & accessible:** ใช้ได้ตั้งแต่มือถือจนถึง Desktop, รองรับคีย์บอร์ดและผู้ใช้ที่ลดการเคลื่อนไหว
5. **CMS clarity:** การแก้ไข Draft / Published ต้องเข้าใจง่ายและป้องกันความเข้าใจผิดเรื่องสถานะ
6. **MVP discipline:** ไม่มีระบบหลายผู้ใช้, Feed, Blog, Analytics/Chart, Public Search, Project Detail Page หรือ Contact Form

### บุคลิกภาพแบรนด์

| คุณลักษณะ | วิธีถ่ายทอดผ่าน UI |
|---|---|
| Modern engineering | Dark canvas, grid เป็นระบบ, icon เรียบ, spacing คงที่ |
| Confident, not noisy | Headline ขนาดใหญ่ สี Mint เฉพาะจุดสำคัญ |
| Detail-oriented | ภาพโปรเจกต์คุณภาพดี, alignment, hover/focus state ครบ |
| Human & approachable | About กระชับ, CTA ชัด, Contact เข้าถึงง่าย |

---

## 2. Mood & Visual Direction

**Mood:** Dark Tech / Modern Minimal / Premium / Developer Workspace

- พื้นหลักเป็นสี Charcoal เขียวเข้ม ไม่ใช้ดำสนิท
- พื้น Card สีเข้มที่สว่างกว่าพื้นหลักเล็กน้อย เพื่อแบ่งลำดับชั้นของข้อมูล
- ขอบ 1px โปร่งบาง แทนการใช้ Shadow หนัก
- Highlight ด้วย Mint เฉพาะ CTA, Active State, Focus Ring, Indicator และลิงก์สำคัญ
- Bento Grid แบบไม่สมมาตรบน Desktop แต่รักษาลำดับการอ่านบน Mobile
- Hero ใช้ตัวอักษรเด่นและพื้นที่ว่าง โดยเน้นความชัดเจนก่อน Decoration
- Code-inspired accents สามารถใช้ได้เล็กน้อย เช่น `<developer />`, เลขลำดับ Section, หรือ terminal motif แต่ไม่ควรแย่งความสนใจจากผลงาน

### สิ่งที่ควรหลีกเลี่ยง

- Glow เขียวทุก Card และ Animation ที่เคลื่อนตลอดเวลา
- พื้นหลังซับซ้อนที่ลด Contrast ของตัวอักษร
- Skill progress bar หรือเปอร์เซ็นต์ความสามารถแบบไม่มีมาตรวัด
- Carousel ที่ซ่อนโปรเจกต์สำคัญไว้โดยไม่จำเป็น
- ข้อความยาวมากใน Hero หรือ Bento Card ขนาดเล็ก

---

## 3. Design Tokens — Color

### Palette

| Token | Hex | ใช้กับ |
|---|---|---|
| `background` | `#091512` | พื้นหลังหน้า Public |
| `surface` | `#14251F` | Card และ Section Surface |
| `surfaceElevated` | `#1D3429` | Card ที่ต้องการความเด่น/Interaction |
| `mint` | `#65F5C4` | Primary CTA, Active, Focus, Accent |
| `textPrimary` | `#F0FAF5` | Headline และข้อความหลัก |
| `textSecondary` | `#9AB5A8` | คำอธิบายและ Metadata |
| `border` | `#29443A` | Card Border, Divider |
| `danger` | `#FF8585` | Error / Delete (ใช้พร้อมข้อความและไอคอน) |
| `warning` | `#F4C879` | Warning / Pending feedback |

**การกระจายสีโดยประมาณ:** 80% Dark Background/Surface, 15% Text/Border, 5% Mint Accent

### กฎการใช้สี

- บนปุ่มพื้น Mint ให้ใช้ **ตัวอักษรสีเข้ม** (`#091512`) ไม่ใช้สีขาว
- เนื้อหาหลักควรใช้ `textPrimary`; คำอธิบายใช้ `textSecondary` โดยต้องตรวจ contrast ในบริบทจริง
- Draft และ Published ต้องมี **ข้อความสถานะ** คู่กับสีเสมอ
- Hover อาจใช้ขอบ Mint จาง ๆ หรือ Surface ที่สว่างขึ้น แต่ไม่ควรทำให้เลย์เอาต์ขยับ
- ตรวจ Contrast ตาม WCAG โดยเฉพาะข้อความเล็ก, ปุ่ม, border และ focus state ก่อนปล่อยจริง

### CSS Variables ตัวอย่าง

```css
:root {
  --color-background: #091512;
  --color-surface: #14251f;
  --color-surface-elevated: #1d3429;
  --color-primary: #65f5c4;
  --color-text-primary: #f0faf5;
  --color-text-secondary: #9ab5a8;
  --color-border: #29443a;
  --color-danger: #ff8585;
  --color-warning: #f4c879;
}
```

---

## 4. Typography

| หน้าที่ | ฟอนต์ | แนวทาง |
|---|---|---|
| Hero & Section Headings | **Syne** | ใช้ Bold / ExtraBold เป็นจุดเด่น |
| Project Titles | **Syne** | ใช้ Semibold–Bold |
| Body, Nav, Forms, Admin | **Plus Jakarta Sans** | เน้นความคมชัดและอ่านง่าย |
| ภาษาไทย | **Noto Sans Thai** (Fallback หรือกำหนดตามภาษา) | ช่วยให้ภาษาไทยอ่านสม่ำเสมอ |
| Code snippets (ถ้ามี) | Monospace ที่อ่านง่าย | ใช้เฉพาะข้อมูลเชิงเทคนิค |

### Type scale แนะนำ

| Element | Desktop | Mobile |
|---|---|---|
| Hero H1 | 64–80px | 36–44px |
| Section H2 | 36–48px | 28–34px |
| Project H3 | 22–28px | 20–24px |
| Body | 16–18px | 16px |
| Caption / Metadata | 12–14px | 12–14px |

- ตั้ง Body Line-height ราว `1.6` และ Heading ราว `1.05–1.2` ตามการทดสอบจริง
- จำกัดความยาวบรรทัด Bio/Description ประมาณ 60–75 อักขระภาษาอังกฤษต่อบรรทัดหากทำได้
- ตรวจด้วยข้อความภาษาไทยและภาษาอังกฤษจริง เพื่อป้องกันปัญหาฟอนต์ตัดบรรทัด
- ใช้ font-display ที่ช่วยไม่ให้ข้อความหายระหว่างโหลดฟอนต์ และทดสอบ Layout Shift

---

## 5. Layout & Spacing System

| Token | ค่าเริ่มต้น |
|---|---|
| Content max-width | `1200px` |
| Desktop grid | `12 columns` |
| Typical grid gap | `20–24px` |
| Card radius | `20–24px` |
| Button radius | `12px` |
| Card padding | `24–32px` Desktop, `20–24px` Mobile |
| Section spacing | `72–112px` Desktop, `48–72px` Mobile |
| Tap target | อย่างน้อย `44 × 44px` |

**หลักการ Bento:** ขนาด Card สื่อความสำคัญ (Hero/Featured Project ใหญ่กว่า Social/Tech Card) ไม่ใช่จัดขนาดแบบสุ่ม และต้องกำหนดลำดับ DOM ให้ตรงกับลำดับการอ่านบนมือถือ

---

## 6. Information Architecture

### Public (`/`)

1. Header / Navigation
2. Hero
3. About + Skills
4. Selected Work
5. Experience
6. Contact + Footer

> การวาง Selected Work ก่อน Experience ช่วยให้ Recruiter เห็นสิ่งที่ทำได้จริงเร็วขึ้น ส่วน Navigation สามารถลิงก์ไปทุก Section ผ่าน anchor ได้

### Admin (`/admin`)

1. Login (หากยังไม่ได้ Authenticate)
2. Dashboard Summary + Quick Actions
3. Profile Editor
4. Skills Manager
5. Experience Manager
6. Projects List
7. Project Editor + Media Upload + Preview
8. Logout

Dashboard ใน MVP เป็น Summary + Quick Actions เท่านั้น ไม่มี Analytics, Chart หรือสถิติผู้ชม และ `/admin` ต้องเปิด Dashboard หลัง Login

---

## 7. Public One-page — Detailed UX

### 7.1 Header / Navigation

**Desktop:** Logo/Wordmark ด้านซ้าย, Anchor Links (`About`, `Work`, `Experience`, `Contact`) ด้านขวา และ CTA ติดต่อหากมีพื้นที่

**Mobile:** Logo + ปุ่ม Menu; เมื่อเปิดเมนู ให้เข้าถึง Anchor ทุกส่วนด้วยคีย์บอร์ดและปิดเมนูได้สะดวก

- ใช้ Sticky Header ได้ แต่ต้องไม่กินพื้นที่มากและมี Contrast สูงพอ
- Anchor ต้องไม่ถูก Header บัง: ใช้ `scroll-margin-top`
- มี Skip-to-content link สำหรับ Keyboard Users

### 7.2 Hero

**ข้อมูล:** `name`, `headline`, `location`, `availableForOpportunities`, `avatarUrl`, `email`, `resumeUrl` (ถ้ามี)

**แนวข้อความตัวอย่าง (Placeholder):**

- Eyebrow: `AVAILABLE FOR OPPORTUNITIES` (แสดงเมื่อ `availableForOpportunities = true` เท่านั้น)
- Headline: `Building digital experiences.`
- Description: `Full Stack Developer crafting scalable systems and thoughtful interfaces.`
- CTA Primary: `Explore My Work` → `#work`
- CTA Secondary: `Contact Me` → `#contact`
- Resume: `Download CV` เฉพาะเมื่อมี URL

**Layout:** Card ตัวอักษรหลักขนาด `8/12` + Card Avatar/Status ขนาด `4/12` บน Desktop; Stack เป็น 1 Column บน Mobile

**คำแนะนำ:** อย่าทำ CTA ติดต่อเป็นลิงก์เสียเมื่อไม่มีข้อมูล Email และต้องมี Alt ที่เหมาะสมสำหรับ Avatar

### 7.3 About + Skills

**Layout:** About Card `7/12` + Tech Stack Card `5/12`

**About:** Bio 2–4 ประโยค กล่าวถึงแนวทางการทำงาน เทคโนโลยีหลัก และสิ่งที่สนใจ (ไม่ใช่ประวัติยาวทุกอย่าง)

**Skills:** จัด Skill Tag ให้สแกนง่าย เช่น Frontend, Backend, Database, DevOps (ถ้าข้อมูลจริงรองรับ) โดยแสดงตาม `sortOrder` ที่ CMS กำหนด

- จำกัดจำนวน Tag ต่อบรรทัดด้วย Responsive Wrap
- อย่าปิดบังชื่อ Skill ด้วย Icon อย่างเดียว
- หากไม่มี Skill ให้ซ่อน Card หรือใช้ Empty State เหมาะสม ไม่แสดงข้อมูลตัวอย่างบน Production

### 7.4 Selected Work

**Layout:** หัวข้อเต็มความกว้าง + Featured Project `7/12` และ Project Card รอง `5/12` หรือ 2 Cards ต่อแถวตามจำนวนจริง

**Project Card Fields:**

- ชื่อ (`title`)
- คำอธิบาย (`description`) จำกัดจำนวนบรรทัดเพื่อความสม่ำเสมอ
- เทคโนโลยี (`techStack`) เป็น Tag
- ภาพหลัก (`coverImageUrl`) พร้อม `alt`
- ปุ่ม `Live Demo` เมื่อมี `projectUrl`
- ปุ่ม `Source Code` เมื่อมี `sourceUrl`
- ปุ่ม `View Gallery` หากมี `gallery`

**Gallery Pattern:** เปิด Modal/Lightbox จาก Card ภายในหน้าเดียว โดยไม่สร้าง Project Detail Page

**Gallery ต้องรองรับ:** ปุ่มปิดที่เห็นชัด, `Escape`, Focus Trap, คืน Focus ไปยัง Trigger เมื่อปิด, Alt ของแต่ละภาพ และการเลื่อนภาพที่ทำงานบนมือถือ

**Publishing Rule:** หน้า Public แสดงเฉพาะ Project ที่ `status = Published` และเรียงตาม `sortOrder`

**Empty State:** หากไม่มี Published Project ให้ใช้ข้อความที่เป็นมิตร เช่น `Selected work will be available soon.` ไม่แสดง Draft และไม่ส่งข้อมูล Draft ไปฝั่ง Browser

### 7.5 Experience

**Presentation:** Vertical Timeline หรือ Stacked Cards

แต่ละรายการต้องมี:

- Role / Degree
- Organization
- Start–End Date หรือ `Present`
- Summary สั้น ๆ และ Highlights ถ้ามี

บน Mobile ใช้ Timeline แนวตั้งเรียบง่ายและหลีกเลี่ยงเส้นเชื่อมซับซ้อน

### 7.6 Contact + Footer

**Content:** Email, GitHub, LinkedIn, Resume (แสดงเฉพาะที่มีข้อมูล)

- Primary CTA: `Let's Connect` หรือ `Email Me` → `mailto:`
- Social Links เปิดปลายทางที่คาดการณ์ได้ และชื่อ accessible ชัดเจน
- Footer ประกอบด้วยชื่อ/ปี/ลิงก์กลับด้านบนได้
- ไม่มี Contact Form ใน MVP ตามข้อกำหนด

---

## 8. Responsive Layout

| Breakpoint เชิงออกแบบ | แนวทาง |
|---|---|
| Mobile (`< 640px`) | 1 Column, Hero Text มาก่อน Avatar, Project 1 Card/Row, Mobile Menu |
| Tablet (`640–1023px`) | 2 Columns เฉพาะกรณีที่ Card ยังอ่านง่าย, ปรับ Span ให้น้อยลง |
| Desktop (`≥ 1024px`) | 12-column Bento Grid, Hero 8+4, About 7+5, Featured 7+5 |

> Breakpoint เป็นค่าแนะนำ ไม่ใช่ข้อบังคับ ให้ตัดสินตามความยาวข้อมูลจริงเป็นหลัก

### Desktop Wireframe แบบย่อ

```text
┌──────────────────────────────────────────────────────────────┐
│ Logo                          About  Work  Experience Contact │
├──────────────────────────────────────┬───────────────────────┤
│ HERO / INTRO (8 columns)             │ AVATAR / STATUS (4)   │
│ Headline · Location · CTAs           │                       │
├────────────────────────────────┬─────┴───────────────────────┤
│ ABOUT (7)                      │ TECH STACK (5)              │
├────────────────────────────────┴─────────────────────────────┤
│ SELECTED WORK                                                │
├──────────────────────────────────────┬───────────────────────┤
│ FEATURED PROJECT (7)                 │ PROJECT CARD (5)      │
├──────────────────────────────────────┼───────────────────────┤
│ EXPERIENCE (8)                       │ CONTACT (4)           │
└──────────────────────────────────────┴───────────────────────┘
```

### Mobile Reading Order

Header → Hero Headline/CTA → Avatar/Status → About → Skills → Selected Work → Experience → Contact

---

## 9. Component Library — Public

| Component | จำเป็นต้องมี |
|---|---|
| `SiteHeader` | Anchor nav, mobile menu, skip link |
| `HeroSection` | Name, headline, location, availability, CTA, avatar |
| `BentoCard` | Variants สำหรับ neutral/highlight, responsive span |
| `SectionHeading` | Eyebrow + H2 + optional subtitle |
| `SkillTag` | Label อ่านได้และ wrap |
| `ProjectCard` | Cover, title, description, tech, action links |
| `ProjectGalleryDialog` | Dialog/Lightbox accessible |
| `ExperienceTimeline` | รายการประสบการณ์เรียงลำดับ |
| `ContactSection` | Email, social, CV |
| `SiteFooter` | Footer links |
| `EmptyState` | กรณีข้อมูลยังไม่พร้อม |

Public และ Admin ต้องใช้ shadcn/ui เป็น Component Foundation สำหรับ Form, Button, Dialog, Table และ Feedback; Aceternity UI ใช้เฉพาะ Visual Component เด่นบนหน้า Landing และต้องไม่ลดทอน Accessibility

### State ที่ต้องออกแบบ

- Default / Hover / Keyboard Focus / Disabled (เฉพาะ Control ที่จำเป็น)
- Loading Skeleton หรือ Loader เมื่อข้อมูลยังไม่พร้อม
- Empty State เมื่อไม่มีข้อมูล
- Error State และ Retry ตามพฤติกรรมของแอป
- Missing Cover Image / Missing Avatar พร้อม Placeholder ไม่ทำให้ Layout พัง

---

## 10. Admin CMS — UX Specification

### 10.1 Visual Style

- ใช้ชุดสีเดียวกับ Public แต่ลด Gradient/Glow ให้เหลือน้อยที่สุด
- ปรับ Navigation ให้มี Sidebar บน Desktop และเมนูยุบ/Drawer บน Mobile
- ใช้รูปแบบ Form ที่ชัดเจนกว่า Bento ที่ตกแต่งเยอะ
- Primary Action หนึ่งตัวต่อบริบท เช่น `Save Changes` หรือ `Publish`
- ทุกการ Save ต้องมี feedback (`Saving…`, `Saved`, `Failed to save`)

### 10.2 Dashboard Summary

หลัง Login สำเร็จต้องเปิด Dashboard ที่มี:

- จำนวน `Draft Projects` และ `Published Projects`
- จำนวน Skills และ Experiences
- `Profile Completeness`
- Quick Actions ไปยัง Profile, Skills, Experience และ Projects

Dashboard ไม่มี Analytics, Chart, Visitor Stats หรือ Data Visualization

### 10.3 Login

**Fields:** Email, Password; ปุ่ม `Sign In`

- ซ่อนรายละเอียดผิดพลาดที่ระบุว่ามีหรือไม่มีอีเมลใดในระบบ
- มี Loading, Invalid credentials, Network error
- ใช้ Session Cookie แบบ Secure HttpOnly ตามสเปก
- ไม่มี Register และ Forgot Password แบบ self-service ใน MVP
- หลัง Login สำเร็จให้ไปที่ Dashboard Summary

### 10.4 Profile Editor

**จัดกลุ่ม Form:**

1. Identity — Name, Headline, Bio, Location, Email
2. Availability — Toggle `availableForOpportunities`
3. Media — Avatar และ Resume PDF Upload
4. Social — GitHub, LinkedIn

- Preview Avatar ก่อนบันทึก
- Field URL ต้องตรวจรูปแบบและรองรับค่าว่าง
- Resume ใช้ Cloudinary เช่นเดียวกับรูปภาพ โดยรับเฉพาะ PDF ขนาดไม่เกิน 20MB
- Profile ไม่มีสถานะ Draft/Published; การ Save มีผลบน Public ทันที และต้องแสดง Feedback ชัดเจน
- `resumeUrl` และ `resumeCloudinaryId` ต้องถูกอัปเดตหรือล้างพร้อมกัน

### 10.5 Skills Manager

- List พร้อมเพิ่ม/แก้ไข/ลบ และจัดลำดับ
- ใช้ Drag & Drop ได้ และต้องมีปุ่ม Move Up / Move Down เพื่อรองรับ Keyboard
- Validate ชื่อไม่ว่างและป้องกันข้อมูลซ้ำโดยไม่สนใจตัวพิมพ์เล็ก/ใหญ่
- บันทึกลำดับผ่าน Batch reorder endpoint และต้องส่งผลต่อหน้า Public

### 10.6 Experience Manager

- เพิ่ม/แก้ไข/ลบ/จัดลำดับประสบการณ์หรือการศึกษา
- ฟิลด์: Role/Title, Organization, Type, Start Date, End Date, Summary, Highlights, Sort Order
- เมื่อ `Present` ให้ไม่บังคับ End Date
- บันทึกลำดับผ่าน Batch reorder endpoint
- ต้อง Confirm ก่อนลบถาวร

### 10.7 Projects List

**Recommended Columns:** Cover Thumbnail · Title · Status · Sort Order · Updated At · Actions

**Actions:** Create, Edit, Delete, Reorder, Publish, Unpublish

**Filter:** All / Draft / Published (เป็นตัวกรองเฉพาะ Admin ไม่ใช่ Public Search)

- Draft: Badge `Draft` สี Neutral และแสดงข้อความกำกับ
- Published: Badge `Published` สี Green/Mint และแสดงข้อความกำกับ
- ไม่มี Analytics Widget หรือ Chart ตามขอบเขต MVP

### 10.8 Project Editor

แบ่ง Form เป็น:

1. **Basic Info:** Title, Slug, Description
2. **Tech Stack:** เพิ่ม/ลบ Technology Tag
3. **Media:** Cover Image, Gallery Images, Alt Text สำหรับการแสดงผล
4. **Links:** Project URL, Source URL
5. **Publishing:** Draft/Published, Sort Order

**Primary Actions:** `Save Draft`, `Publish`; เมื่อเผยแพร่แล้วมี `Save Changes` และ `Unpublish`

**Publishing Rule:** Data Model มี `status` ระดับ Project แต่ไม่มี Revision/Versioning ดังนั้นการแก้ไข Project ที่ Published แล้วกด Save จะมีผลบน Public ทันที UI ต้องแสดงข้อความเตือนนี้ก่อนบันทึก

### 10.9 Preview ก่อนเผยแพร่ (บังคับใน MVP)

Preview ต้องใช้ค่าปัจจุบันในฟอร์มโดย **ไม่เรียก Public API และไม่เปิดเผย Draft ผ่าน Public Endpoint** ใช้ Side Panel หรือ Preview Modal ที่แสดง Hero/Profile/Project Card/Gallery ตามดีไซน์ Public

### 10.10 Media Upload

- ใช้ Cloudinary สำหรับ Avatar, Cover, Gallery Images และ Resume PDF
- Browser ต้องส่งไฟล์ผ่าน Backend; ห้ามใช้ Cloudinary Secret หรือ Write Credential ฝั่ง Browser
- รองรับ JPEG, PNG, WebP ไม่เกิน 10MB และ PDF ไม่เกิน 20MB
- Gallery จำกัดไม่เกิน 10 รูปต่อ Project
- แสดง Preview, Progress/Uploading, Success, Error และปุ่ม Remove/Retry
- ตรวจ MIME, ขนาดไฟล์ และจำนวนรูปซ้ำที่ Backend
- เมื่อ Remove ให้ลบ Database Reference ก่อน และไม่ลบ Cloudinary Asset ทันที

---

## 11. Content Model ของ MVP

รายละเอียด canonical อยู่ใน [Docs/db.md](db.md) และ field names ใน UX ต้องตรงกับ Prisma model:

### Profile

`name`, `headline`, `bio`, `location`, `email`, `availableForOpportunities`, `avatarUrl`, `avatarAlt`, `avatarCloudinaryId`, `resumeUrl`, `resumeCloudinaryId`, `githubUrl`, `linkedinUrl`

### Skill

`id`, `profileId`, `name`, `category`, `sortOrder`

### Experience

`id`, `profileId`, `title`, `organization`, `type`, `startDate`, `endDate`, `summary`, `highlights`, `sortOrder`

### Project

`id`, `profileId`, `title`, `slug`, `description`, `techStack`, `coverImageUrl`, `coverImageAlt`, `coverCloudinaryId`, `gallery`, `projectUrl`, `sourceUrl`, `status`, `sortOrder`, `createdAt`, `updatedAt`

### ProjectImage

`id`, `projectId`, `imageUrl`, `cloudinaryId`, `alt`, `sortOrder`

Profile, Skill และ Experience ไม่มี Draft state; Project เท่านั้นที่มี `DRAFT`/`PUBLISHED`

---

## 12. API & Frontend Integration Contract

รายละเอียด Request/Response canonical อยู่ใน [README.md](../README.md#api-contract) และต้องทำให้ตรงกันใน Swagger

### Endpoint ที่ต้องมี

| Method | Endpoint | Auth/CSRF | Scope |
|---|---|---|---|
| GET | `/portfolio` | Public | Profile, Skills, Experiences และ Published Projects |
| POST | `/auth/login` | Public | Login และ Set JWT Cookie |
| POST | `/auth/logout` | Auth + CSRF | Logout และล้าง Cookie |
| GET | `/auth/csrf` | Public | คืน CSRF Token |
| GET | `/portfolio/admin/profile` | Auth | อ่าน Profile สำหรับ Admin |
| PATCH | `/portfolio/admin/profile` | Auth + CSRF | แก้ Profile |
| GET | `/portfolio/admin/summary` | Auth | Dashboard Summary |
| CRUD | `/portfolio/admin/skills` | Auth + CSRF สำหรับ Mutation | Skills |
| CRUD | `/portfolio/admin/experiences` | Auth + CSRF สำหรับ Mutation | Experiences |
| CRUD | `/portfolio/admin/projects` | Auth + CSRF สำหรับ Mutation | Projects |
| PATCH | `/portfolio/admin/{resource}/reorder` | Auth + CSRF | Batch reorder |
| POST | `/media/upload` | Auth + CSRF | Avatar, Cover, Gallery และ Resume |

### Frontend Data Rules

- Public fetch ใช้ Server-side `no-store` และไม่ cache Draft
- Admin ทุก mutation ส่ง CSRF Token ใน Header
- Preview ใช้ Form State ภายใน Browser ไม่เรียก Public API และไม่สร้าง Public URL สำหรับ Draft
- Public DTO ไม่แสดง `ownerId`, Password, Cloudinary IDs หรือ Internal timestamps ที่ไม่จำเป็น
- Action Link แสดงเฉพาะเมื่อ URL มีค่าและผ่าน URL validation
- หลัง Save/Publish/Unpublish/Reorder ให้แสดง Success/Error feedback และ re-fetch Public data ตาม `no-store`

### Authentication & Security UX/Implementation

- Account เจ้าของเดียว ไม่มี Register และ Role System
- Password Hash ด้วย Argon2
- JWT ส่งผ่าน `Secure`, `HttpOnly`, `SameSite=Lax` Cookie
- Browser ใช้ Same-origin `/api` proxy จาก Next.js ไป NestJS
- Mutation ต้องตรวจ Origin/Referer และ CSRF Token; ห้ามพึ่ง HttpOnly Cookie เพียงอย่างเดียว
- Admin API ทุก Endpoint รวม Upload ต้องตรวจ Authentication/Authorization
- Public API ไม่คืน Draft หรือ Secret แม้จะซ่อนด้วย CSS/JS ได้ก็ตาม
- Secret, DB Credentials และ Cloudinary Secret เก็บฝั่ง Server ใน Environment Variables เท่านั้น
- ไม่เปิด CORS แบบ wildcard; ถ้ามี Internal service call ให้จำกัด Origin เป็น `FRONTEND_URL`

### Data Fetching & SEO

- Next.js ใช้ Server Rendering สำหรับ Public และ `no-store` เพื่อให้ข้อมูลล่าสุดแสดงทันที
- สร้าง `title`, `description`, canonical URL, Open Graph Image และ Social Metadata
- ใช้ Semantic HTML (`header`, `main`, `section`, `footer`) และ Heading Hierarchy ที่ถูกต้อง
- Image ที่ส่งเข้าเว็บควร Optimize ขนาด, Format, Responsive `sizes`, Width/Height เพื่อลด Layout Shift
- หากมี Public Portfolio เพียงหน้าเดียวให้ SEO Focus ที่หน้า `/`

---

## 13. Accessibility Checklist

MVP ต้องตั้งเป้า WCAG 2.2 AA และตรวจด้วย Keyboard, Screen Reader ขั้นพื้นฐาน และ Lighthouse ก่อนถือว่าเสร็จ

- [ ] ใช้ Semantic Heading ตามลำดับ: H1 เพียงจุดหลัก, H2 เป็น Section, H3 เป็น Card Title
- [ ] มี Skip-to-content Link
- [ ] Tab Order ตรงกับลำดับการอ่านที่เห็นบนจอ
- [ ] Focus State ชัดเจนและไม่ใช้สีเพียงอย่างเดียวสื่อสถานะ
- [ ] ปุ่ม/ลิงก์มี Accessible Name ที่สื่อการทำงาน
- [ ] ภาพมี Alt ที่เหมาะสม หรือ Alt ว่างสำหรับภาพตกแต่งล้วน
- [ ] Modal/Lightbox รองรับ Escape, Focus Trap และ Restore Focus
- [ ] Error/Success Form มีข้อความที่อ่านและประกาศให้ Assistive Tech ได้
- [ ] Form Input มี Label จริง ไม่ใช้ Placeholder แทน Label
- [ ] ตรวจ Contrast สำหรับข้อความและ Interactive Controls
- [ ] รองรับ `prefers-reduced-motion`
- [ ] ตรวจใช้งานจริงด้วย Keyboard และ Screen Reader ขั้นพื้นฐาน

---

## 14. Motion & Interaction Requirements

| Interaction | ข้อกำหนด |
|---|---|
| Card Hover | ยก Surface เล็กน้อยหรือเปลี่ยน Border Color โดยไม่ขยับเนื้อหาจนอ่านยาก |
| CTA Hover | เปลี่ยนความสว่างหรือ Transform เล็กน้อย |
| Anchor Scroll | Smooth เมื่อไม่อยู่ใน Reduced Motion |
| Content Entrance | Fade/Slide ระยะสั้น เฉพาะที่ช่วยการรับรู้ |
| Loading | Skeleton สำหรับส่วนที่ยังไม่พร้อม และ Progress สำหรับ Upload |
| Save/Publish | Toast หรือ Inline Status ที่ชัดเจน |
| Dangerous Action | Confirm Dialog พร้อมชื่อรายการที่จะลบ/Unpublish |

**หลักการ:** Motion ต้องไม่ทำให้ข้อมูลสำคัญแสดงช้าหรือทำให้เว็บดูเป็น Demo Effect มากกว่า Portfolio

---

## 15. Suggested Folder / Component Split

โครงสร้างขั้นต่ำที่ใช้เป็น Implementation Contract:

```text
frontend/              # Next.js + TypeScript
    app/
      page.tsx         # Public one-page
      admin/           # Admin routes
    components/
      public/
      admin/
      ui/
    lib/
      api/
      types/
      design-tokens/
backend/               # NestJS + TypeScript
    src/
      auth/
      portfolio/
      projects/
      skills/
      experience/
      media/
prisma/
  schema.prisma
```

- แยก Presentational UI ออกจาก API Fetching/Mutations
- Reuse `Button`, `Input`, `Badge`, `Dialog`, `Card`, `Toast` ระหว่าง Public และ Admin ตามความเหมาะสม
- อย่าผูก Theme Dark/Surface Rules ติดกับ Business Logic

---

## 16. Definition of Done — MVP UI/UX

### Public

- [ ] หน้า `/` แสดงข้อมูลจริงจาก Backend ได้
- [ ] มี Hero, About, Skills, Selected Work, Experience, Contact
- [ ] Hero แสดง Availability ตาม `availableForOpportunities`
- [ ] ไม่แสดง Project สถานะ Draft แม้ใน Network Response ของ Public API
- [ ] เรียง Project และ Skills ตามค่า Sort Order
- [ ] เรียง Experience ตามค่า Sort Order
- [ ] Project Action Links แสดงเฉพาะ URL ที่มีอยู่
- [ ] Gallery Modal เปิด/ปิดและใช้งานผ่าน Keyboard ได้
- [ ] Mobile/Desktop ไม่มี Horizontal Overflow
- [ ] SEO Metadata และ Alt Text พร้อม
- [ ] Public fetch ใช้ `no-store`

### Admin

- [ ] Login และ Logout ทำงานจริง
- [ ] หน้า Admin ปฏิเสธผู้ไม่ได้ Authentication
- [ ] Dashboard มี Summary และ Quick Actions โดยไม่มี Analytics
- [ ] Profile Editor, Skills, Experience, Projects CRUD ทำงาน
- [ ] Profile, Skills และ Experience Save แล้วมีผล Public ทันที
- [ ] Save/Upload/Publish/Unpublish มี Feedback และ Error State
- [ ] Draft/Published แยกชัดและเปลี่ยนสถานะได้จริง
- [ ] Project ที่ Published แก้ไขแล้วมีผล Public ทันที
- [ ] Batch Reorder Projects/Skills/Experience ส่งผลบนหน้า Public
- [ ] Upload รูปภาพและ Resume PDF ผ่าน Backend พร้อม Validation และไม่เปิด Secret
- [ ] Preview ใช้ Form State และไม่เปิดเผย Draft ผ่าน Public API

### Engineering QA

- [ ] Swagger ระบุ Request/Response และ Auth ของแต่ละ Endpoint
- [ ] มี Unit, API e2e และ Browser smoke tests สำหรับ Login, CRUD, Draft/Published, Reorder, Upload และ Public Read
- [ ] ตรวจ CORS, Cookie, CSRF Protection และ NestJS standard Error Handling
- [ ] ตรวจ Lighthouse/Core Web Vitals บน Mobile อย่างน้อยหน้า `/`
- [ ] ผ่าน WCAG 2.2 AA checklist, Focus Navigation, Screen Reader ขั้นพื้นฐาน และ Reduced Motion

---

## 17. ลำดับการทำงานที่แนะนำ

| Phase | งาน | ผลลัพธ์ |
|---|---|---|
| 1. Foundation | Design Tokens, Typography, Grid, UI Primitives | Component พื้นฐานพร้อมใช้ |
| 2. Public MVP | Hero, About/Skills, Work, Experience, Contact | หน้า One-page พร้อม Responsive |
| 3. Content & API | PostgreSQL/Prisma, Public GET, Seed | หน้า Public ใช้ข้อมูลจริง |
| 4. Admin Core | Login, Profile, Skills, Experience, Projects CRUD | CMS แก้ไขข้อมูลได้ |
| 5. Publishing & Media | Draft/Published, Sorting, Cloudinary, Resume PDF, Gallery, Preview | Workflow ของเจ้าของครบ |
| 6. Hardening | SEO, Accessibility, Security, Tests, Swagger | พร้อมประเมินตาม Acceptance Criteria |

---

## 18. ข้อสรุปการออกแบบ

**Direction ที่แนะนำ:** `Dark Neon Mint + Editorial Typography + Asymmetric Bento Grid`

- **ภาพลักษณ์:** Modern, Technical, Professional
- **ประสบการณ์ Public:** อ่านง่าย ดูผลงานไว ติดต่อสะดวก
- **ประสบการณ์ Admin:** จัดการข้อมูลชัดเจน ลดโอกาส Publish ผิด
- **เน้นสิ่งสำคัญ:** ความน่าเชื่อถือของผลงานและคุณภาพการใช้งานมากกว่า Visual Effect
- **MVP Boundary:** One-page เดียว + Single-owner CMS + Project Publishing/Media + Admin Preview โดยไม่สร้างฟีเจอร์ที่ไม่อยู่ในขอบเขต

ข้อกำหนดชุดนี้เป็น Implementation Handoff ที่ตัดสินใจครบแล้ว สามารถนำไปสร้าง UI Components, API และ Tests ต่อได้ทันที
