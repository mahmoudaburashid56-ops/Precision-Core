const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// إعدادات Middleware
app.use(express.json()); // لتحليل البيانات القادمة بصيغة JSON
app.use(cors()); // للسماح للمتصفح بالاتصال بالسيرفر محلياً

// 1. الاتصال بقاعدة البيانات (MongoDB)
mongoose.connect('mongodb://localhost:27017/PrecisionDB')
    .then(() => console.log('✅ Connected to MongoDB (PrecisionDB)'))
    .catch(err => console.error('❌ Connection error:', err));

// 2. تعريف مخطط البيانات (Schema)
const ContactSchema = new mongoose.Schema({
    fullName: String,
    company: String,
    email: String,
    phone: String,
    details: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);

app.post('/api/contact', async (req, res) => {
    try {
        // فحص جذري: هل البيانات فارغة؟
        if (!req.body || Object.keys(req.body).length === 0) {
            console.error('⚠️ تحذير: السيرفر استلم طلب فارغ تماماً!');
            return res.status(400).send({ error: 'Data is empty' });
        }

        console.log('📥 بيانات واصلة الآن:', req.body);

        const newEntry = new Contact({
            fullName: req.body.name || req.body.fullName, // تجربة الاسمين لضمان المطابقة
            company: req.body.company,
            email: req.body.email,
            phone: req.body.phone,
            details: req.body.details
        });

        const savedData = await newEntry.save();
        console.log('✅ تم الحفظ في قاعدة البيانات بنجاح:', savedData);
        res.status(200).send({ message: 'Success' });
    } catch (error) {
        console.error('❌ خطأ فني أثناء الحفظ:', error);
        res.status(500).send({ error: error.message });
    }

});

// 4. مسار جلب البيانات للوحة التحكم (GET)
// هذا الجزء الذي طلبته لعرض البيانات في الـ Vault
app.get('/api/vault', async (req, res) => {
    try {
        // ترتيب من الأحدث للأقدم باستخدام sort({ date: -1 })
        const contacts = await Contact.find().sort({ date: -1 }); 
        res.json(contacts);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).send({ error: 'Failed to fetch vault data' });
    }
});

// 5. تشغيل السيرفر على المنفذ 3000
const PORT = 3000;
app.delete('/api/vault/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Deleted Successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});
app.listen(PORT, () => {
    console.log(`🚀 Precision Core Server is running on http://localhost:${PORT}`);
});