# 🛒 STI Shop

## 📌 Loyihaning maqsadi:
STI (Sifatli,Tezkor,Ishonchli) Shop — foydalanuvchilarga mahsulotlarni buyurtma berish yoki o‘z mahsulotlarini sotuvga qo‘yish imkonini beruvchi onlayn platforma.

---

## ✅ Funksional talablar:

- 👀 Foydalanuvchi profilga kirmasdan mahsulotlarni ko‘rishi mumkin
- 🔒 Profilga kirmasdan buyurtma berish yoki mahsulot sotuvga qo‘yish taqiqlanadi
- 📝 Ro‘yxatdan o‘tish: ismi, email va paroli orqali
- 🔐 Kirish: email va parol orqali
- 🛍 Profilga kirgandan keyin:
  - Mahsulot buyurtma berish
  - Mahsulot sotuvga qo‘yish
- 🔑 Parol 10 karra shifrlanadi
- ✏️ Profil ma'lumotlarini yangilash
- 🔄 Parolni yangilash
- ❌ Profilni o‘chirish
- 🧺 Mahsulotlarni savatga qo‘shish va o‘chirish
- 📦 Savatdagi mahsulotlarni buyurtma qilish
- 🗂 Mahsulot faqat mavjud kategoriyalardan tanlanadi
- 💰 Foydalanuvchi daromadini ko‘rishi mumkin
- 💳 Balansni ko‘rish
- 🛒 Sotuvga qo‘yilgan mahsulotlarni ko‘rish

---

## ⚙️ No-funksional talablar:

- ⚡ Tezlik
- 🔐 Xavfsizlik
- 🤝 Ishonchlilik

---

## 🗄 Database Model:

### 1. 🧑 Users
| Field        | Type        | Description                   |
|--------------|-------------|-------------------------------|
| id           | Number (PK) | Primary key                   |
| name         | String      | Foydalanuvchi ismi            |
| email        | String      | Email manzili                 |
| password     | String      | Shifrlangan parol             |
| role         | ENUM        | 'Manager', 'Admin', 'User'    |
| balance      | DECIMAL     | Foydalanuvchi balansi         |
| income       | DECIMAL     | Daromadi                      |
| created_at   | TIMESTAMP   | Yaratilgan vaqt               |
| updated_at   | TIMESTAMP   | Yangilangan vaqt              |

---

### 2. 📦 Products
| Field        | Type         | Description                         |
|--------------|--------------|-------------------------------------|
| id           | Number (PK)  | Primary key                         |
| name         | String       | Mahsulot nomi                       |
| image        | File         | Rasm                               |
| description  | Text         | Mahsulot tavsifi                    |
| price        | DECIMAL      | Narxi                              |
| quantity     | Int          | Miqdori                            |
| is_active    | BOOLEAN      | Aktivlik holati (default: true)    |
| category_id  | INTEGER FK   | Kategoriya ID (foreign key)         |
| user_id      | INTEGER FK   | Egasi (foreign key: users.id)       |
| created_at   | TIMESTAMP    | Yaratilgan vaqt                    |
| updated_at   | TIMESTAMP    | Yangilangan vaqt                   |

---

### 3. 🧺 Cart Items
| Field        | Type         | Description                          |
|--------------|--------------|--------------------------------------|
| id           | Number (PK)  | Primary key                          |
| user_id      | INTEGER FK   | Foydalanuvchi ID                     |
| product_id   | INTEGER FK   | Mahsulot ID                          |
| quantity     | INT          | Mahsulot soni                        |
| created_at   | TIMESTAMP    | Qo‘shilgan vaqt (default: NOW)       |
---

### 4. 📦 Orders
| Field        | Type         | Description                          |
|--------------|--------------|--------------------------------------|
| id           | Number (PK)  | Primary key                          |
| user_id      | INTEGER FK   | Buyurtmachi ID                       |
| status       | ENUM         | 'pending', 'success', 'canceled'     |
| total_price  | DECIMAL      | Umumiy narx                          |

---

### 5. 📦 Order Items
| Field        | Type         | Description                          |
|--------------|--------------|--------------------------------------|
| id           | Number (PK)  | Primary key                          |
| order_id     | INTEGER FK   | Buyurtma ID                          |
| product_id   | INTEGER FK   | Mahsulot ID                          |
| quantity     | INT          | Soni                                 |
| price        | DECIMAL      | Narxi                                |

---

### 6. 🗂 Categories
| Field        | Type         | Description                          |
|--------------|--------------|--------------------------------------|
| id           | Number (PK)  | Primary key                          |
| name         | String       | Kategoriya nomi                      |
| created_at   | TIMESTAMP    | Yaratilgan vaqt                      |
| updated_at   | TIMESTAMP    | Yangilangan vaqt                    |

---

## 📣 Muallif:
**Hojiakbar** – Full-Stack Dasturchi 🚀  
Telegram channel: [https://t.me/hoji_developer]  
GitHub: [https://github.com/MrHojiakbar]

---

## 📌 Eslatma:
Loyiha hali ishlab chiqilmoqda. Hozircha test versiyasida!

