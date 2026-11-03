# 🌿 MeZuMir — মিরসরাইয়ের দেশি খাবার ও অনলাইন অর্ডার প্ল্যাটফর্ম

মিরসরাইয়ের ঘরোয়া ও দেশি খাবার, মিষ্টি, স্ন্যাক্স এবং পানীয়ের অনলাইন অর্ডারিং ল্যান্ডিং পেজ ও ই-কমার্স প্ল্যাটফর্ম।

## 🚀 টেকনোলজি স্ট্যাক
- **Frontend Framework:** React 19 + TypeScript
- **Bundler & Build Tool:** Vite
- **Styling:** Tailwind CSS + PostCSS
- **Icons:** Lucide React
- **Typography:** Hind Siliguri (Google Fonts)
- **Deployment Platform:** Cloudflare Pages (with Edge CDN, custom domains & SSL)

---

## ☁️ ক্লাউডফ্লেয়ার পেজেস (Cloudflare Pages) ডিপ্লয়মেন্ট গাইড

### ধাপ ১: Cloudflare ড্যাশবোর্ডে যান
1. [Cloudflare Dashboard](https://dash.cloudflare.com/)-এ লগইন করুন।
2. বাম পাশের মেনু থেকে **"Workers & Pages"** ➔ **"Create application"** ➔ **"Pages"** ট্যাবে ক্লিক করুন।
3. **"Connect to Git"** চাপুন।

### ধাপ ২: গিটহাব রিপোজিটরি নির্বাচন করুন
- আপনার গিটহাব অ্যাকাউন্ট কানেক্ট করে **`labibfohayer/MeZuMir-E-commarce`** রিপোজিটরিটি সিলেক্ট করুন।
- **"Begin setup"** চাপুন।

### ধাপ ৩: বিল্ড কনফিগারেশন সেট করুন
নিচের সেটিংসগুলো প্রদান করুন:
- **Project name:** `mezumir-ecommerce` (অথবা আপনার পছন্দমতো নাম)
- **Production branch:** `main`
- **Framework preset:** `Vite`
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (ফাঁকা রাখুন)

*(প্রজেক্টের ভেতর `.node-version`, `_redirects` এবং `_headers` ফাইল পূর্বেই কনফিগার করা আছে, ফলে কোনো প্রকার এরর বা রিফ্রেশ 404 ইস্যু হবে না)*

### ধাপ ৪: সেভ ও ডিপ্লয়
- **"Save and Deploy"** বাটনে ক্লিক করুন।
- ১ মিনিটের ভেতর ক্লাউডফ্লেয়ার পেজটি বিল্ড করে আপনার ফ্রি লাইভ ইউআরএল দিয়ে দিবে (যেমন: `https://mezumir.pages.dev`)।
- আপনি চাইলে এখান থেকে এক ক্লিকে আপনার নিজস্ব কাস্টম ডোমেইন (Custom Domain) যুক্ত করতে পারবেন।

---

## 📦 লোকাল সেটআপ ও রান
```bash
# ডিপেন্ডেন্সি ইন্সটল
npm install

# ডেভেলপমেন্ট সার্ভার চালু
npm run dev

# প্রোডাকশন বিল্ড টেস্ট
npm run build
```
