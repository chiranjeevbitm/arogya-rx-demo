# Arogya Rx · demo website

**Prescription ready before the patient stands up.**
Arogya Rx is clinic software for busy OPDs in Bihar and UP. It produces 30-second prescriptions on the doctor's own letterhead, prints generic names in capitals, sends Hindi dose timings to the patient on WhatsApp, and takes voice and photo intake.

This repo is the **marketing website and a fully clickable demo app**. Everything runs in the browser on sample data, and there is no backend.

- Live: deployed on Vercel (see the repo's About link)
- Demo login: `demo@arogyarx.in` / `demo1234` (pre-filled; press **Log in**)

## What you can try

| Area | What works |
| --- | --- |
| Website | A minimal, motion-led landing page: animated hero (a parchi filling itself in, a consult timer, Jan Aushadhi savings and a Hindi WhatsApp message), six win-point tiles (listens to the consult, `pcm tds 3d` shorthand, WhatsApp follow-up, Hindi voice note, photo intake, safety checks), a **Why Arogya Rx** section with a yearly-price and WhatsApp-cost graph plus a “where we're ahead” list, three plans, and expanders for depth (all 28 features with a Live · In pilot · Roadmap filter, plan contents, roadmap, team, FAQ). English / हिंदी, light / dark, a demo-request form that opens WhatsApp or email. Motion turns off under the reduced-motion setting. |
| Home | Today's appointments, KPIs, **Ask Arogya**: plain-language questions over patient records |
| Schedule | 7-day calendar; add, reschedule, cancel; mark arrived (creates an OPD token) |
| WhatsApp | **Inbox** (new booking with pre-visit summary, “1” to book a follow-up, a dose question answered from the doctor's own parchi, a clinical question routed to the doctor, clinic info); **Automations** (8 switchable flows with message previews and a monthly cost estimate); **Recall** (send a Hindi message to diabetics overdue for HbA1c, hypertensives who missed follow-up, ANC due); **Photo scan** of an old prescription or lab report |
| OPD & Rx | Token queue; **Listen to the consult**: a consent prompt, then a doctor–patient–compounder conversation in Hinglish with complaints, vitals, allergies, diagnosis, medicines, tests, advice, follow-up and the patient's questions picked out live, a draft parchi, and a Hindi summary + voice note for WhatsApp (scripted for 6 patients; **Try with my own voice** uses the browser's speech recognition in Chrome); **shorthand medicines** (`pcm tds 3d`, `azi od 3`, brand names, typos), one-tap usual medicines and “repeat last visit”; one-tap diagnosis templates, Jan Aushadhi prices, allergy, duplicate, interaction and paracetamol-dose checks, an NMC-ready checklist beside the parchi, vitals flags, Hindi dose lines, live parchi, A5 print, WhatsApp preview, consult timer |
| Patients | Search, visit timeline, HbA1c and BP trend charts |
| Security | Staff logins and roles (switch someone off), who-can-see-what table, read-only activity log, your sessions with log out of other devices |
| Settings | Letterhead studio (name, Hindi name, degrees, registration, colours, layout), saved in the browser |

## Feature status

- **Live**: running at Arogya Clinic, Muzaffarpur today (from the original DoctorAppointmentForm app).
- **In pilot**: in the new build, and shown in this demo.
- **Roadmap**: planned for phases 2 to 4 (offline mode, ABHA/ABDM, billing/UPI, labs and pharmacies, nursing homes, Nikshay/HMIS, regional languages, teleconsult, recall campaigns).

## Stack

A static site with no build step: `index.html`, `css/styles.css` (app) and `css/landing.css` (landing page), and `js/` (`i18n.js`, `data.js`, `consult.js` for shorthand parsing, speech-to-facts extraction and the Hindi voice note, `app.js`, `landing.js` for landing motion). Hash routes: `#top` website, `#login`, `#app-<view>`.

```bash
# run locally
npx serve .        # or: python3 -m http.server 8000
```

## Made by

**Chiranjeev Kumar**, GenAI engineer:
[Portfolio](https://chiranjeev-ai-engineer.vercel.app) · [LinkedIn](https://linkedin.com/in/chiranjeevkumar47) · chiranjeevkumar47@gmail.com · +91 95465 19953

All patients, prices and the demo doctor are sample data. Medicine prices are indicative.
