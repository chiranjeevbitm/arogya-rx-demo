# Arogya Rx · demo website

**Prescription ready before the patient stands up.**
Arogya Rx is clinic software for busy OPDs in Bihar and UP. It produces 30-second prescriptions on the doctor's own letterhead, prints generic names in capitals, sends Hindi dose timings to the patient on WhatsApp, and takes voice and photo intake.

This repo is the **marketing website and a fully clickable demo app**. Everything runs in the browser on sample data, and there is no backend.

- Live: deployed on Vercel (see the repo's About link)
- Demo login: `demo@arogyarx.in` / `demo1234` (pre-filled; press **Log in**)

## What you can try

| Area | What works |
| --- | --- |
| Website | English / हिंदी toggle, light / dark theme, feature filter (Live · In pilot · Roadmap), roadmap, monthly/yearly pricing, team, FAQ, a demo-request form that opens WhatsApp or email |
| Home | Today's appointments, KPIs, **Ask Arogya**: plain-language questions over patient records |
| Schedule | 7-day calendar; add, reschedule, cancel; mark arrived (creates an OPD token) |
| Intake | WhatsApp booking assistant (simulated chat with a pre-visit summary); photo intake of an old prescription or lab report (upload, drop or sample) |
| OPD & Rx | Token queue, one-tap diagnosis templates, Hinglish voice-to-Rx (scripted), medicine search with Jan Aushadhi prices, allergy and duplicate checks, vitals flags, Hindi dose lines, live parchi, A5 print, WhatsApp preview, consult timer |
| Patients | Search, visit timeline, HbA1c and BP trend charts |
| Settings | Letterhead studio (name, Hindi name, degrees, registration, colours, layout), saved in the browser |

## Feature status

- **Live**: running at Arogya Clinic, Muzaffarpur today (from the original DoctorAppointmentForm app).
- **In pilot**: in the new build, and shown in this demo.
- **Roadmap**: planned for phases 2 to 4 (offline mode, ABHA/ABDM, billing/UPI, labs and pharmacies, nursing homes, Nikshay/HMIS, regional languages, teleconsult, recall campaigns).

## Stack

A static site with no build step: `index.html`, `css/styles.css`, and `js/` (`i18n.js`, `data.js`, `app.js`). Hash routes: `#top` website, `#login`, `#app-<view>`.

```bash
# run locally
npx serve .        # or: python3 -m http.server 8000
```

## Made by

**Chiranjeev Kumar**, GenAI engineer:
[Portfolio](https://chiranjeev-ai-engineer.vercel.app) · [LinkedIn](https://linkedin.com/in/chiranjeevkumar47) · chiranjeevkumar47@gmail.com · +91 95465 19953

All patients, prices and the demo doctor are sample data. Medicine prices are indicative.
