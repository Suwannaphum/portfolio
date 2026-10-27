# Personal Portfolio — Neon Mint Design Specification

> **ประเภทเอกสาร:** UI/UX Design Specification + Implementation Handoff  
> **โปรเจกต์:** Personal Portfolio — One-page + Admin CMS  
> **แนวทางหลัก:** Dark Neon Mint · Syne + Plus Jakarta Sans · Asymmetric Bento Grid · Developer / Engineer  
> **รองรับ responsive**
> **เวอร์ชัน:** 1.0

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
6. **MVP discipline:** ไม่มีระบบหลายผู้ใช้, Feed, Blog, Analytics Dashboard, Public Search, Project Detail Page หรือ Contact Form

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
2. Profile Editor
3. Skills Manager
4. Experience Manager
5. Projects List
6. Project Editor + Image Upload
7. Logout

**ไม่ต้องมี Analytics Dashboard** ตามขอบเขต MVP; สามารถเปิดหน้า `/admin` เข้าหน้า Projects List หรือหน้าจัดการหลักได้ทันที

---

## 7. Public One-page — Detailed UX

### 7.1 Header / Navigation

**Desktop:** Logo/Wordmark ด้านซ้าย, Anchor Links (`About`, `Work`, `Experience`, `Contact`) ด้านขวา และ CTA ติดต่อหากมีพื้นที่

**Mobile:** Logo + ปุ่ม Menu; เมื่อเปิดเมนู ให้เข้าถึง Anchor ทุกส่วนด้วยคีย์บอร์ดและปิดเมนูได้สะดวก

- ใช้ Sticky Header ได้ แต่ต้องไม่กินพื้นที่มากและมี Contrast สูงพอ
- Anchor ต้องไม่ถูก Header บัง: ใช้ `scroll-margin-top`
- มี Skip-to-content link สำหรับ Keyboard Users

### 7.2 Hero

**ข้อมูล:** `name`, `headline`, `location` หรือสถานะงาน, `avatarUrl`, `email`, `resumeUrl` (ถ้ามี)

**แนวข้อความตัวอย่าง (Placeholder):**

- Eyebrow: `AVAILABLE FOR OPPORTUNITIES` (แสดงเมื่อสถานะนี้เป็นความจริงและกำหนดในข้อมูล)
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
- ปุ่ม `View Gallery` หากมี `galleryUrls`

**Gallery Pattern:** เปิด Modal/Lightbox จาก Card ภายในหน้าเดียว โดยไม่สร้าง Project Detail Page

**Gallery ต้องรองรับ:** ปุ่มปิดที่เห็นชัด, `Escape`, Focus Trap, คืน Focus ไปยัง Trigger เมื่อปิด, Alt ของแต่ละภาพ และการเลื่อนภาพที่ทำงานบนมือถือ

**Publishing Rule:** หน้า Public แสดงเฉพาะ Project ที่ `status = Published` และเรียงตาม `sortOrder`

**Empty State:** หากไม่มี Published Project ให้ใช้ข้อความที่เป็นมิตร เช่น `Selected work will be available soon.` ไม่แสดง Draft และไม่ส่งข้อมูล Draft ไปฝั่ง Browser

### 7.5 Experience

**Presentation:** Vertical Timeline หรือ Stacked Cards

แต่ละรายการควรมี:

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
| `HeroSection` | Name, headline, location/status, CTA, avatar |
| `BentoCard` | Variants สำหรับ neutral/highlight, responsive span |
| `SectionHeading` | Eyebrow + H2 + optional subtitle |
| `SkillTag` | Label อ่านได้และ wrap |
| `ProjectCard` | Cover, title, description, tech, action links |
| `ProjectGalleryDialog` | Dialog/Lightbox accessible |
| `ExperienceTimeline` | รายการประสบการณ์เรียงลำดับ |
| `ContactSection` | Email, social, CV |
| `SiteFooter` | Footer links |
| `EmptyState` | กรณีข้อมูลยังไม่พร้อม |

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

### 10.2 Login

**Fields:** Email, Password; ปุ่ม `Sign In`

- ซ่อนรายละเอียดผิดพลาดที่ระบุว่ามีหรือไม่มีอีเมลใดในระบบ
- มี Loading, Invalid credentials, Network error
- ใช้ Session Cookie แบบ Secure HttpOnly ตามสเปก
- ไม่มี Register / Forgot password แบบ self-service ใน MVP หากยังไม่กำหนดวิธี Recovery

### 10.3 Profile Editor

**จัดกลุ่ม Form:**

1. Identity — Name, Headline, Bio, Location, Email
2. Media — Avatar และ Resume PDF upload
3. Social — GitHub, LinkedIn

- Preview Avatar ก่อนบันทึก
- Field URL ต้องตรวจรูปแบบและรองรับค่าว่าง
- Resume รับเป็น PDF ผ่าน Backend เท่านั้น; Backend ตรวจ MIME/ขนาดไม่เกิน 20MB แล้วอัปโหลด Cloudinary พร้อมเก็บ `resumeUrl` และ `resumeCloudinaryId`
- **สำคัญ:** ข้อมูล Profile ไม่มีสถานะ Draft/Published ใน Data Model ปัจจุบัน การ Save จะมีผลบน Public เมื่อระบบดึงข้อมูลใหม่; ต้องแจ้งผลนี้ไว้ใน UI

### 10.4 Skills Manager

- List พร้อมเพิ่ม/แก้ไข/ลบ และจัดลำดับ
- ใช้ Drag & Drop ได้ แต่ควรมีปุ่ม Move Up / Move Down เพื่อรองรับ Keyboard
- Validate ชื่อไม่ว่างและป้องกันข้อมูลซ้ำตามกติกาที่ตกลง
- Sort Order ที่ Save ต้องส่งผลต่อหน้า Public

### 10.5 Experience Manager

- เพิ่ม/แก้ไข/ลบ/จัดลำดับประสบการณ์หรือการศึกษา
- ฟิลด์แนะนำ: Role/Title, Organization, Type, Start Date, End Date, Summary, Sort Order
- เมื่อ `Present` ให้ไม่บังคับ End Date
- พิจารณา Confirm ก่อนลบถาวร

### 10.6 Projects List

**Recommended Columns:** Cover Thumbnail · Title · Status · Sort Order · Updated At · Actions

**Actions:** Create, Edit, Delete, Reorder, Publish, Unpublish

**Filter:** All / Draft / Published (เป็นตัวกรองเฉพาะ Admin ไม่ใช่ Public Search)

- Draft: Badge `Draft` สี Neutral และแสดงข้อความกำกับ
- Published: Badge `Published` สี Green/Mint และแสดงข้อความกำกับ
- ไม่มี Analytics Widget ตามขอบเขต MVP

### 10.7 Project Editor

แบ่ง Form เป็น:

1. **Basic Info:** Title, Slug, Description
2. **Tech Stack:** เพิ่ม/ลบ Technology Tag
3. **Media:** Cover Image, Gallery Images, Alt Text สำหรับการแสดงผล
4. **Links:** Project URL, Source URL
5. **Publishing:** Draft/Published, Sort Order

**Primary Actions:** `Save Draft`, `Publish`; เมื่อเผยแพร่แล้วมี `Save Changes` และ `Unpublish`

**ข้อควรระวัง:** ใน Data Model ปัจจุบันมีเพียง `status` ระดับ Project ไม่มีระบบ Revision แยก Draft Content จาก Published Content ดังนั้นเมื่อแก้ไขเนื้อหาของ Project ที่ Published และกด Save เนื้อหาอาจเปลี่ยนบน Public ทันที **ไม่ควรระบุว่ารองรับการแก้ Draft ของ Project ที่เผยแพร่แล้วโดยไม่กระทบ Public** เว้นแต่เพิ่มโครงสร้างข้อมูลสำหรับ Revision/Versioning

### 10.8 Preview ก่อนเผยแพร่

Admin ต้องมี Preview ภายในจากค่าปัจจุบันในฟอร์มโดย **ไม่เรียก Public API และไม่เปิดเผย Draft ผ่าน Public Endpoint** ใช้ Side Panel หรือ Preview Dialog ที่แสดง Card ในดีไซน์ Public

### 10.9 Media Upload

- ใช้ Cloudinary สำหรับ Avatar, Cover, Gallery Images และ Resume PDF
- แสดง Preview, Progress/Uploading, Success, Error และปุ่ม Remove/Retry
- ตรวจชนิด MIME ที่อนุญาต (`image/jpeg`, `image/png`, `image/webp`, `application/pdf`), รูปไม่เกิน 10MB, PDF ไม่เกิน 20MB และ Gallery ไม่เกิน 10 รูปต่อ Project
- Validate ซ้ำที่ Backend ไม่เชื่อแค่ Frontend
- ไม่ส่ง Cloudinary Secret หรือ Credential สำหรับเขียนข้อมูลไปยัง Browser
- หลีกเลี่ยงการลบภาพจาก Cloudinary ทันทีหากยังถูกอ้างถึงในข้อมูลอื่น

---

## 11. Content Model — MVP Locked

Model ขั้นต่ำตาม Requirement ครอบคลุม Profile, Skills, Experience, Projects และ Gallery Images:

### Profile

`name`, `headline`, `bio`, `location`, `email`, `availableForOpportunities`, `avatarUrl`, `avatarAlt`, `avatarCloudinaryId`, `resumeUrl`, `resumeCloudinaryId`, `githubUrl`, `linkedinUrl`

### Skill

`id`, `name`, `category?`, `sortOrder`

### Experience

`id`, `title`, `organization`, `type?`, `startDate`, `endDate?`, `summary?`, `highlights`, `sortOrder`

### Project

`id`, `title`, `slug`, `description`, `techStack`, `coverImageUrl`, `coverImageAlt`, `coverCloudinaryId`, `gallery[]`, `projectUrl?`, `sourceUrl?`, `status (Draft|Published)`, `sortOrder`, `createdAt`, `updatedAt`

### ProjectImage

`id`, `projectId`, `imageUrl`, `cloudinaryId`, `alt`, `sortOrder`

> `?` หมายถึง Optional ตาม Prisma schema; Gallery และ Cloudinary references ถูกตรวจสอบที่ Backend

---

## 12. API & Frontend Integration Notes

### Endpoint ที่ Implement แล้ว

| Method | Endpoint | Scope |
|---|---|---|
| GET | `/portfolio` | Public: ข้อมูลสำหรับหน้า One-page เฉพาะ Published Projects |
| POST | `/auth/login` | Admin Login |
| POST | `/auth/logout` | Admin Logout |
| GET / PATCH | `/portfolio/admin/profile` | Admin Read / Edit Profile |
| GET / POST / PATCH / DELETE | `/portfolio/admin/skills` | Admin Skill Management |
| GET / POST / PATCH / DELETE | `/portfolio/admin/experiences` | Admin Experience Management |
| GET / POST / PATCH / DELETE | `/portfolio/admin/projects` | Admin Project Management |
| PATCH | `/portfolio/admin/{skills,experiences,projects}/reorder` | Batch Reorder |
| POST | `/media/upload` | Authenticated image/PDF upload |

ทุก Resource รองรับ `GET /:id`; ทุก Mutation ใช้ Session Cookie + CSRF และทุก Admin read ใช้ Session Cookie

Admin Preview เป็น client-side Form State และไม่มี Preview Endpoint หรือ Public API call

### Authentication & Security UX/Implementation

- Account เจ้าของเดียว ไม่มี Register และ Role System
- Password Hash ด้วย Argon2
- JWT ส่งผ่าน Secure HttpOnly Cookie; กำหนด `SameSite` และ Cookie Path/Domain ให้เหมาะกับ Deployment
- สำหรับ Cookie-based Auth ต้องออกแบบการป้องกัน CSRF บน API ที่เปลี่ยนข้อมูลด้วย ไม่พึ่ง HttpOnly เพียงอย่างเดียว
- Admin API ทุก Endpoint รวม Upload ต้องตรวจ Authentication/Authorization
- Public API ไม่คืน Draft หรือ Secret แม้จะซ่อนด้วย CSS/JS ได้ก็ตาม
- Secret, DB Credentials และ Cloudinary Secret เก็บฝั่ง Server ใน Environment Variables เท่านั้น
- การจัดการ Cookie ข้าม Origin ต้องตั้งค่า CORS/Credentials อย่างจำกัด

### Data Fetching & SEO

- Next.js ใช้ Dynamic Server Rendering และ `no-store` สำหรับ Public API เพื่อให้ข้อมูลที่ Save/Publish เห็นผลทันที
- สร้าง `title`, `description`, canonical URL, Open Graph Image และ Social Metadata
- ใช้ Semantic HTML (`header`, `main`, `section`, `footer`) และ Heading Hierarchy ที่ถูกต้อง
- Image ที่ส่งเข้าเว็บควร Optimize ขนาด, Format, Responsive `sizes`, Width/Height เพื่อลด Layout Shift
- หากมี Public Portfolio เพียงหน้าเดียวให้ SEO Focus ที่หน้า `/`

---

## 13. Accessibility Checklist

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

## 14. Motion & Interaction Guidelines

| Interaction | ข้อเสนอ |
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

ตัวอย่างเชิงแนวคิด ไม่ใช่ข้อบังคับด้าน Architecture:

```text
apps/
  web/                 # Next.js + TypeScript
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
  api/                 # NestJS + TypeScript
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
- [ ] ไม่แสดง Project สถานะ Draft แม้ใน Network Response ของ Public API
- [ ] เรียง Project และ Skills ตามค่า Sort Order
- [ ] Project Action Links แสดงเฉพาะ URL ที่มีอยู่
- [ ] Gallery Modal เปิด/ปิดและใช้งานผ่าน Keyboard ได้
- [ ] Mobile/Desktop ไม่มี Horizontal Overflow
- [ ] SEO Metadata และ Alt Text พร้อม

### Admin

- [ ] Login และ Logout ทำงานจริง
- [ ] หน้า Admin ปฏิเสธผู้ไม่ได้ Authentication
- [ ] Profile Editor, Skills, Experience, Projects CRUD ทำงาน
- [ ] Save/Upload/Publish/Unpublish มี Feedback และ Error State
- [ ] Draft/Published แยกชัดและเปลี่ยนสถานะได้จริง
- [ ] Reorder Projects/Skills ส่งผลบนหน้า Public
- [ ] Upload รูปภาพพร้อม Validation และไม่เปิด Secret

### Engineering QA

- [ ] Swagger ระบุ Request/Response และ Auth ของแต่ละ Endpoint
- [ ] มี Tests สำหรับ Login, Project CRUD, Draft/Published และ Public Read
- [ ] ตรวจ CORS, Cookie, CSRF Protection และ Error Handling
- [ ] ตรวจ Lighthouse/Core Web Vitals บน Mobile อย่างน้อยหน้า `/`
- [ ] ตรวจ Focus Navigation และ Reduced Motion

---

## 17. ลำดับการทำงานที่แนะนำ

| Phase | งาน | ผลลัพธ์ |
|---|---|---|
| 1. Foundation | Design Tokens, Typography, Grid, UI Primitives | Component พื้นฐานพร้อมใช้ |
| 2. Public MVP | Hero, About/Skills, Work, Experience, Contact | หน้า One-page พร้อม Responsive |
| 3. Content & API | PostgreSQL/Prisma, Public GET, Seed | หน้า Public ใช้ข้อมูลจริง |
| 4. Admin Core | Login, Profile, Skills, Experience, Projects CRUD | CMS แก้ไขข้อมูลได้ |
| 5. Publishing & Media | Draft/Published, Sorting, Cloudinary, Gallery | Workflow ของเจ้าของครบ |
| 6. Hardening | SEO, Accessibility, Security, Tests, Swagger | พร้อมประเมินตาม Acceptance Criteria |
| 7. Hardening Polish | Reduced Motion, Keyboard และ Admin Preview | ปิด Acceptance Criteria โดยไม่ขยาย MVP |

---

## 18. ข้อสรุปการออกแบบ

**Direction ที่แนะนำ:** `Dark Neon Mint + Editorial Typography + Asymmetric Bento Grid`

- **ภาพลักษณ์:** Modern, Technical, Professional
- **ประสบการณ์ Public:** อ่านง่าย ดูผลงานไว ติดต่อสะดวก
- **ประสบการณ์ Admin:** จัดการข้อมูลชัดเจน ลดโอกาส Publish ผิด
- **เน้นสิ่งสำคัญ:** ความน่าเชื่อถือของผลงานและคุณภาพการใช้งานมากกว่า Visual Effect
- **MVP Boundary:** One-page เดียว + Single-owner CMS + Project Publishing/Media โดยไม่สร้างฟีเจอร์ที่ไม่อยู่ในขอบเขต

### Decision Log — MVP Locked

1. Resume ใช้ Cloudinary PDF upload; `resumeUrl` และ `resumeCloudinaryId` ถูกบันทึกจากผลอัปโหลด
2. Availability ใช้ `Profile.availableForOpportunities` และแสดงใน Hero เมื่อเป็น `true`
3. Admin Preview ใช้ค่าจาก Form State โดยตรง ไม่เรียก Public API และไม่เปิดเผย Draft
4. Save Project ที่ Published มีผล Public ทันที และไม่มี Revision/Versioning
5. Public Frontend ใช้ `no-store` เพื่อให้ Publish/Unpublish และการแก้ข้อมูลที่ Public เห็นผลทันที

เมื่อได้คำตอบเหล่านี้ สามารถนำเอกสารนี้ไปสร้าง **Figma Wireframe**, UI Components และ Implementation Tasks ต่อได้ทันที
