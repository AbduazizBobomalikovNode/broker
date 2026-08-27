# MQTT Broker

IoT qurilmalar uchun o'z MQTT brokeringiz va uni boshqaradigan web panel.

Broker qurilmalarni qabul qiladi, panel esa ularni ro'yxatga oladi, topiclarga biriktiradi va kim nimaga yozishi mumkinligini belgilaydi.

> Bu diplom ishi doirasida yozilgan. Juftlik loyihasi — chaqiruvlarni vazifaga aylantiruvchi [smart-call-servise](https://github.com/AbduazizBobomalikovNode/smart-call-servise).

---

## Muammo

IoT qurilmalarni ulash uchun broker kerak. Tayyor bulut xizmatlari bor, lekin uchta narsa halal beradi: ular pullik, ulanishlar soni cheklangan va ma'lumotingiz begona serverdan o'tadi. Ichki tarmoqda ishlaydigan zavod yoki bino uchun bu ko'pincha umuman to'g'ri kelmaydi.

O'z brokeringizni ko'tarish esa ishning yarmi. Qolgan yarmi — qurilmalarni ro'yxatga olish, topiclarni taqsimlash va ruxsatlarni boshqarish. Buning uchun panel kerak.

## Nima qiladi

- **Broker ishga tushiradi** — Mosca ustida, qurilmalar to'g'ridan-to'g'ri shunga ulanadi
- **Qurilmalarni ro'yxatga oladi** — har biri bazada o'z yozuvi va o'z topic'i bilan
- **Ruxsatlarni boshqaradi** — kim qaysi topic'ni o'qiydi, kim yozadi
- **Ulanishlarni ko'rsatadi** — panelda real vaqtda (Socket.io)
- **QR bilan qo'shadi** — yangi qurilmani qo'lda kiritish shart emas

## Qanday ishlaydi

```
Qurilma ──MQTT──►  Mosca broker  ──►  Express server
                                          │
                                          ├─► qurilmani tanish   (device)
                                          ├─► topic ruxsati      (device_has_topic)
                                          └─► panel              (Socket.io + Pug)
```

Broker va panel bitta jarayonda ishlaydi. Qurilma ulanganda uning identifikatori va tokeni tekshiriladi; ruxsat berilgan topiclar `device_has_topic` jadvalidan olinadi.

Autentifikatsiya JWT bilan: qurilma parol o'rniga imzolangan token yuboradi.

## Ma'lumot modeli

| Jadval | Nima saqlaydi |
|---|---|
| `device` | Qurilmalar |
| `topic` | MQTT topiclari |
| `device_has_topic` | Qaysi qurilma qaysi topic'ga ulangan |
| `user` | Panel foydalanuvchilari |
| `role` | Rollar |
| `role_has_task` | Rol qanday vazifalarni ko'radi |
| `task` | Vazifalar |
| `action` | Harakatlar tarixi (audit) |
| `static` | Sozlamalar |

## O'rnatish

```bash
git clone https://github.com/AbduazizBobomalikovNode/broker.git
cd broker
npm install

cp .env.example .env      # qiymatlarni to'ldiring
npm start
```

Kerak bo'ladi: Node.js 16+ va MongoDB. NeDB yengil lokal saqlash uchun ishlatiladi, alohida o'rnatish talab qilmaydi.

## Environment

| O'zgaruvchi | Nima uchun |
|---|---|
| `URI_MONGO` | MongoDB ulanish satri |
| `JWT_MY_KEY` | Token imzolash kaliti. Yangi qiymat: `openssl rand -base64 32` |
| `NODE_ENV` | `development` yoki `production` |

Qiymat berilmasa ilova ishga tushmaydi va sababini aytadi.

## Tuzilma

```
index.js          server va routerlar
broker.js         Mosca broker sozlamalari
routers/          REST endpointlar (device, topic, user, role…)
db/
  mongodb.js      ulanish
  tables/         jadval funksiyalari
middlewire/
  auth.js         JWT tekshiruvi
nedb/             lokal saqlash
views/            Pug shablonlari (panel)
```

## Texnologiyalar

Node.js · Mosca (MQTT) · Express · MongoDB · NeDB · Socket.io · Pug · JWT · bcrypt · Joi · qrcode
