/* Static content and sample clinic data for the Arogya Rx demo. All patients, prices and the demo doctor are fictional. */
(function(){
const ICONS={
 print:'<path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 pulse:'<path d="M3 12h4l2-6 4 12 2-6h6"/>',
 heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
 users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6"/>',
 save:'<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/>',
 tap:'<path d="M9 11V5a2 2 0 0 1 4 0v6M13 10a2 2 0 0 1 4 0v4a7 7 0 0 1-7 7 6 6 0 0 1-5-3l-2-4 1-1 3 2V9"/>',
 lang:'<path d="M3 5h12M9 3v2M5 5c1 5 4 8 8 9M13 5c-1 4-4 8-8 10M13 21l4-10 4 10M14.5 18h5"/>',
 rupee:'<path d="M6 4h12M6 9h12M6 4h3a5 5 0 0 1 0 10H6l9 7"/>',
 lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1.2"/>',
 key:'<circle cx="8" cy="15" r="4"/><path d="m10.8 12.2 8.7-8.7M16 6l3 3M14 8l2 2"/>',
 logs:'<path d="M8 6h12M8 12h12M8 18h12"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 server:'<rect x="4" y="4" width="16" height="7" rx="2"/><rect x="4" y="13" width="16" height="7" rx="2"/><path d="M8 7.5h.01M8 16.5h.01"/>',
 phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
 ban:'<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
 shield:'<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
 wa:'<path d="M4 20l1.4-4.2A8 8 0 1 1 8.6 19z"/><path d="M9 9.5c.5 2.2 2.3 4 4.5 4.5l1.2-1.2 2 .9"/>',
 mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
 cam:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
 queue:'<path d="M4 6h16M4 12h10M4 18h6"/><circle cx="18" cy="16" r="3"/>',
 chart:'<path d="M4 20V4M4 20h16M8 16l4-5 3 3 5-7"/>',
 spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
 cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 brain:'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3V4zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3V4z"/>',
 wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',
 id:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2.5"/><path d="M5.5 16.5a4 4 0 0 1 7 0M15 10h3M15 13h3"/>',
 lab:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7 15h10"/>',
 building:'<path d="M4 21V5l8-2v18M12 7l8 2v12M8 8h1M8 12h1M8 16h1M15 12h1M15 16h1"/>',
 gov:'<path d="M3 10h18L12 4zM5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/>',
 video:'<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',
 bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"/>',
 home:'<path d="M3 11l9-7 9 7v9H3z"/><path d="M9 20v-6h6v6"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
 inbox:'<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 2h6l1-2h5"/>',
 rx:'<path d="M6 20V4h6a4 4 0 0 1 0 8H6M10 12l8 8M18 12l-8 8"/>',
 out:'<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11"/>',
 next:'<path d="M5 12h14M13 6l6 6-6 6"/>'
};
const svg=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[k]||''}</svg>`;

/* status: live = running at Arogya Clinic today; pilot = in the new build (try it in the demo); road = planned */
const FEATURES=[
 ['live','print','Prints exactly like your parchi','आपके पर्चे जैसा ही प्रिंट','Your letterhead, Hindi clinic name, registration number and layout, rebuilt pixel for pixel. Patients and chemists see the parchi they already trust.','आपका letterhead, हिंदी में क्लिनिक का नाम, रजिस्ट्रेशन नंबर और लेआउट, हूबहू। मरीज़ और केमिस्ट वही पर्ची देखते हैं जिस पर वे भरोसा करते हैं।','Live at Arogya Clinic'],
 ['live','search','205,507 medicines, searched in milliseconds','2,05,507 दवाइयाँ, पल भर में खोज','Brand and generic names with pack size and price, including the Jan Aushadhi (PMBJP) catalogue. Works with half-typed names.','ब्रांड और जेनेरिक नाम, पैक साइज़ और कीमत के साथ, जन औषधि (PMBJP) सूची समेत। आधा नाम लिखने पर भी मिल जाती है।','Live at Arogya Clinic'],
 ['live','pulse','Vitals with instant red flags','वाइटल्स पर तुरंत चेतावनी','BP, pulse, SpO₂, temperature and sugar turn amber or red when out of range. Normal exam findings pre-filled, so you only type what is abnormal.','BP, पल्स, SpO₂, बुखार और शुगर सीमा से बाहर होने पर पीले या लाल हो जाते हैं। सामान्य जाँच पहले से भरी, आप केवल असामान्य लिखें।','Live at Arogya Clinic'],
 ['live','heart','Eight chronic-disease profiles','आठ पुरानी बीमारियों की प्रोफ़ाइल','Diabetes, hypertension, COPD, TB, thyroid, CAD, CKD and stroke, each with its own fields: HbA1c, eGFR, LVEF, inhalers, complications.','डायबिटीज़, BP, COPD, TB, थायरॉइड, हृदय रोग, किडनी रोग और स्ट्रोक, हर एक के अपने फ़ील्ड: HbA1c, eGFR, LVEF, इन्हेलर, जटिलताएँ।','Live at Arogya Clinic'],
 ['live','users','Patient directory and clinic dashboard','मरीज़ सूची और क्लिनिक डैशबोर्ड','Find any past patient, reopen their prescription, and see today’s and this week’s numbers at a glance.','किसी भी पुराने मरीज़ को खोजें, उनकी पर्ची खोलें, और आज व इस हफ़्ते के आँकड़े एक नज़र में देखें।','Live at Arogya Clinic'],
 ['live','save','Autosave, every two seconds','हर दो सेकंड में अपने-आप सेव','A power cut or a closed tab never loses a half-written prescription.','बिजली जाने या टैब बंद होने पर भी अधूरी पर्ची नहीं खोती।','Live at Arogya Clinic'],
 ['pilot','tap','One-tap diagnosis templates','एक टैप में डायग्नोसिस टेम्पलेट','Tap "Viral fever" and five medicines, doses, tests, advice and the follow-up date fill in. Change only what differs.','"वायरल बुखार" दबाएँ, और दवाइयाँ, खुराक, जाँच, सलाह और फ़ॉलो-अप तारीख भर जाती है। केवल जो अलग है वो बदलें।','Phase 2 · try it in the demo'],
 ['pilot','lang','Hindi dose timings for every patient','हर मरीज़ के लिए हिंदी में खुराक','"1-0-1 after food" prints as "सुबह और रात · खाने के बाद · 5 दिन" under each medicine, and goes to WhatsApp.','"1-0-1 after food" हर दवा के नीचे "सुबह और रात · खाने के बाद · 5 दिन" छपता है, और WhatsApp पर भी जाता है।','Phase 2 · try it in the demo'],
 ['pilot','rupee','Generic first, with Jan Aushadhi savings','पहले जेनेरिक, जन औषधि बचत के साथ','Generic names print in CAPITALS as the NMC asks. Each parchi shows what it costs in brands versus Jan Aushadhi.','जेनेरिक नाम NMC के अनुसार बड़े अक्षरों में। हर पर्ची पर ब्रांड बनाम जन औषधि खर्च दिखता है।','Phase 2 · try it in the demo'],
 ['pilot','shield','Allergy and duplicate-drug checks','एलर्जी और दोहरी दवा की जाँच','Sulfa or penicillin allergy blocks the save. Two antihistamines or two acid reducers get flagged before they print.','सल्फ़ा या पेनिसिलिन एलर्जी पर पर्ची सेव नहीं होती। दो एंटीहिस्टामिन या दो एसिडिटी की दवा छपने से पहले पकड़ी जाती है।','Phase 2 · try it in the demo'],
 ['pilot','wa','WhatsApp parchi and follow-up reminders','WhatsApp पर पर्ची और फ़ॉलो-अप याद','PDF plus a Hindi dose schedule on the patient’s phone. A reminder the day before follow-up; the patient replies 1 to book.','मरीज़ के फ़ोन पर PDF और हिंदी में दवा का समय। फ़ॉलो-अप से एक दिन पहले याद; मरीज़ 1 लिखकर बुक करता है।','Phase 2 · try it in the demo'],
 ['pilot','queue','Token queue and reception login','टोकन कतार और रिसेप्शन लॉगिन','Your compounder adds name, age and phone. The patient appears in your queue with a token number.','आपका कंपाउंडर नाम, उम्र और फ़ोन डालता है। मरीज़ टोकन नंबर के साथ आपकी कतार में आ जाता है।','Phase 2 · try it in the demo'],
 ['pilot','mic','Listens to the consult, writes the parchi','बातचीत सुनकर पर्ची तैयार','Doctor, patient and compounder talk normally in Hinglish. Complaints, vitals, allergies, diagnosis, medicines, tests and follow-up are picked out live, and a draft parchi appears for you to check.','डॉक्टर, मरीज़ और कंपाउंडर आम हिंग्लिश में बात करते हैं। तकलीफ़, वाइटल्स, एलर्जी, डायग्नोसिस, दवा, जाँच और फ़ॉलो-अप अपने-आप निकलते हैं और पर्ची का ड्राफ़्ट जाँचने के लिए तैयार होता है।','Pilot · in demo'],
 ['pilot','tap','Type “pcm tds 3d”, get the full line','“pcm tds 3d” लिखें, पूरी लाइन तैयार','Short names, brand names and typos all work. Dose, timing and days are read from the same line, so one Enter adds a complete medicine.','छोटे नाम, ब्रांड नाम और गलत स्पेलिंग भी चलती है। खुराक, समय और दिन उसी लाइन से समझ लिए जाते हैं, एक Enter में पूरी दवा जुड़ जाती है।','Pilot · in demo'],
 ['pilot','spark','Hindi summary and voice note for the patient','मरीज़ के लिए हिंदी सारांश और वॉइस नोट','After the consult the patient gets a short Hindi summary, the answers to the questions they asked, and a voice note of the dose timings on WhatsApp.','परामर्श के बाद मरीज़ को WhatsApp पर छोटा हिंदी सारांश, उनके सवालों के जवाब और खुराक का वॉइस नोट मिलता है।','Pilot · in demo'],
 ['pilot','bell','WhatsApp automations','WhatsApp ऑटोमेशन','Booking confirmation, reminders with a reschedule button, “your turn is next”, refill reminders and follow-up recall, each switched on or off by you.','बुकिंग की पुष्टि, दोबारा समय चुनने वाले रिमाइंडर, “आपका नंबर आने वाला है”, दवा खत्म होने से पहले याद और फ़ॉलो-अप, सब आपके हाथ में।','Pilot · in demo'],
 ['pilot','shield','Interaction, dose and NMC checks','इंटरैक्शन, खुराक और NMC जाँच','Painkiller with a BP medicine, too much paracetamol in a day, missing registration number: each is flagged before the parchi prints.','BP की दवा के साथ दर्द-निवारक, दिन में ज़्यादा पैरासिटामोल, रजिस्ट्रेशन नंबर नहीं: पर्ची छपने से पहले हर चीज़ पकड़ी जाती है।','Pilot · in demo'],
 ['pilot','cam','Photo intake of old prescriptions and lab reports','पुरानी पर्ची और रिपोर्ट की फ़ोटो से इतिहास','Snap the folder the patient brings. Medicines, doses and lab values become structured history in seconds.','मरीज़ जो फ़ाइल लाता है उसकी फ़ोटो लें। दवाइयाँ, खुराक और जाँच के नतीजे सेकंडों में इतिहास बन जाते हैं।','Phase 3 · simulated in the demo'],
 ['pilot','chart','Patient timeline with HbA1c and BP trends','मरीज़ की टाइमलाइन, HbA1c और BP ट्रेंड','Every visit, every scanned report, and a trend line against target for chronic patients.','हर विज़िट, हर स्कैन की गई रिपोर्ट, और पुराने मरीज़ों के लिए लक्ष्य के सामने ट्रेंड लाइन।','Phase 2 · try it in the demo'],
 ['pilot','spark','Ask Arogya: plain-language search','"Ask Arogya": आम भाषा में खोज','"Diabetic patients with HbA1c above 7" or "who is due this week" answered from your own records.','"HbA1c 7 से ऊपर वाले डायबिटीज़ मरीज़" या "इस हफ़्ते किसका फ़ॉलो-अप है" आपके रिकॉर्ड से जवाब।','Phase 3 · try it in the demo'],
 ['pilot','inbox','WhatsApp booking and pre-visit intake','WhatsApp पर बुकिंग और पहले से जानकारी','Patients book a slot, describe symptoms and send reports on WhatsApp. You get a short case summary before they arrive.','मरीज़ WhatsApp पर समय बुक करते हैं, तकलीफ़ बताते हैं और रिपोर्ट भेजते हैं। आने से पहले आपको छोटा सारांश मिलता है।','Phase 3 · simulated in the demo'],
 ['road','wifi','Works offline, syncs later','बिना इंटरनेट काम, बाद में सिंक','Prescriptions and printing keep working when the internet drops. Everything syncs when it returns.','इंटरनेट जाने पर भी पर्ची और प्रिंट चलते रहते हैं। लौटने पर सब सिंक हो जाता है।','Phase 2 · Dec 2026'],
 ['road','brain','AI pre-visit summary and differentials','AI सारांश और संभावित निदान','A one-paragraph summary of past visits and reports, with possible diagnoses listed as advice for the doctor to accept or ignore.','पिछली विज़िट और रिपोर्ट का एक पैराग्राफ़ सारांश, और संभावित निदान सलाह के रूप में, डॉक्टर मानें या न मानें।','Phase 3 · early 2027'],
 ['road','rupee','Billing, receipts and UPI','बिलिंग, रसीद और UPI','Consultation fee, procedure charges and a UPI QR on the receipt. Daily collection report for the clinic.','परामर्श शुल्क, प्रोसीजर चार्ज और रसीद पर UPI QR। क्लिनिक के लिए रोज़ का कलेक्शन रिपोर्ट।','Phase 3 · early 2027'],
 ['road','id','ABHA and ABDM linking','ABHA और ABDM से जुड़ाव','Create or scan a patient’s ABHA, share records with consent, and qualify for digital-health incentives.','मरीज़ का ABHA बनाएँ या स्कैन करें, सहमति से रिकॉर्ड साझा करें, और डिजिटल हेल्थ प्रोत्साहन के योग्य बनें।','Phase 4 · mid 2027'],
 ['road','lab','Lab and pharmacy connections','लैब और फ़ार्मेसी से जुड़ाव','Send test orders to your partner lab, get results straight into the patient timeline, and send prescriptions to a nearby chemist.','पार्टनर लैब को जाँच भेजें, नतीजे सीधे मरीज़ की टाइमलाइन में, और पास के केमिस्ट को पर्ची भेजें।','Phase 4 · mid 2027'],
 ['road','building','Nursing homes and multi-doctor clinics','नर्सिंग होम और कई डॉक्टर वाले क्लिनिक','Shared patients across doctors, per-doctor letterheads, admin reports and role-based access.','डॉक्टरों में साझा मरीज़, हर डॉक्टर का अपना letterhead, एडमिन रिपोर्ट और भूमिका के अनुसार अनुमति।','Phase 4 · mid 2027'],
 ['road','gov','Government programme reporting','सरकारी कार्यक्रम रिपोर्टिंग','Auto-fill Nikshay (TB) and HMIS reports from your records, built on our existing Nikshay automation work.','आपके रिकॉर्ड से Nikshay (TB) और HMIS रिपोर्ट अपने-आप भरें, हमारे मौजूदा Nikshay ऑटोमेशन पर आधारित।','Phase 4 · 2027'],
 ['road','lang','More languages: Bhojpuri, Maithili, Bengali, Urdu','और भाषाएँ: भोजपुरी, मैथिली, बांग्ला, उर्दू','Dose instructions and WhatsApp messages in the language your patient reads best.','दवा का समय और WhatsApp संदेश उस भाषा में जो मरीज़ सबसे अच्छी तरह पढ़ता है।','Phase 4 · 2027'],
 ['road','video','Doctor in 10 minutes: teleconsult','10 मिनट में डॉक्टर: टेली-परामर्श','WhatsApp video consults with UPI payment and an e-prescription that follows the Telemedicine Practice Guidelines.','WhatsApp वीडियो परामर्श, UPI भुगतान और टेलीमेडिसिन दिशानिर्देशों के अनुसार ई-पर्ची।','Phase 4 · 2027'],
 ['pilot','users','Chronic-care recall campaigns','पुराने मरीज़ों के लिए रिकॉल अभियान','Find every diabetic overdue for HbA1c or every hypertensive who missed follow-up, and remind them in one click.','HbA1c जाँच से छूटे हर डायबिटीज़ मरीज़ या फ़ॉलो-अप भूले हर BP मरीज़ को एक क्लिक में याद दिलाएँ।','Phase 4 · 2027'],
 ['pilot','lock','Clinic-only access and security','सिर्फ़ आपके क्लिनिक की पहुँच और सुरक्षा','Records are locked to your clinic. A login per staff member with doctor, reception and admin roles, an activity log that cannot be edited, data stored in India and encrypted.','रिकॉर्ड सिर्फ़ आपके क्लिनिक तक सीमित। हर स्टाफ़ का अलग लॉगिन (डॉक्टर, रिसेप्शन, एडमिन), ऐसा ऑडिट लॉग जो बदला नहीं जा सकता, डेटा भारत में और एन्क्रिप्टेड।','Phase 1 · Nov 2026'],
 ['road','shield','OTP login, backups and DPDP consent','OTP लॉगिन, बैकअप और DPDP सहमति','A one-time code on your mobile at login, daily backups, and patient consent records with data export under the DPDP Act.','लॉगिन पर मोबाइल OTP, रोज़ का बैकअप, और DPDP कानून के अनुसार मरीज़ की सहमति का रिकॉर्ड व डेटा निर्यात।','Phase 1–2 · Nov–Dec 2026']
].map(f=>({st:f[0],ic:f[1],t:{en:f[2],hi:f[3]},d:{en:f[4],hi:f[5]},ph:f[6]}));

const ROADMAP=[
 {when:'Nov 2026',now:true,t:{en:'1 · Secure the core',hi:'1 · मज़बूत नींव'},items:{en:['One account per clinic, data walled off','OTP login, staff roles, audit log','India hosting, encryption, backups'],hi:['हर क्लिनिक का अलग खाता, डेटा सुरक्षित','OTP लॉगिन, स्टाफ़ भूमिकाएँ, ऑडिट लॉग','भारत में होस्टिंग, एन्क्रिप्शन, बैकअप']},gate:{en:'Gate: Arogya Clinic migrated',hi:'पड़ाव: आरोग्य क्लिनिक नए सिस्टम पर'}},
 {when:'Dec 2026',t:{en:'2 · Ready to sell',hi:'2 · बिक्री के लिए तैयार'},items:{en:['Letterhead builder','Templates, Hindi doses, allergy checks','WhatsApp parchi and reminders','Offline mode, UPI subscriptions'],hi:['Letterhead बनाने का टूल','टेम्पलेट, हिंदी खुराक, एलर्जी जाँच','WhatsApp पर्ची और याद','ऑफ़लाइन मोड, UPI सब्सक्रिप्शन']},gate:{en:'Gate: 10 paying clinics',hi:'पड़ाव: 10 भुगतान करने वाले क्लिनिक'}},
 {when:'Jan–Apr 2027',t:{en:'3 · AI that saves minutes',hi:'3 · समय बचाने वाला AI'},items:{en:['Voice to prescription (Hinglish)','Photo intake of old Rx and reports','WhatsApp booking assistant','Billing, receipts, token screen'],hi:['बोलकर पर्ची (हिंग्लिश)','पुरानी पर्ची और रिपोर्ट की फ़ोटो','WhatsApp बुकिंग सहायक','बिलिंग, रसीद, टोकन स्क्रीन']},gate:{en:'Gate: 50 paying clinics',hi:'पड़ाव: 50 क्लिनिक'}},
 {when:'May–Oct 2027',t:{en:'4 · Scale across Bihar and UP',hi:'4 · बिहार और UP में विस्तार'},items:{en:['ABHA / ABDM linking','Labs, pharmacies, nursing homes','Teleconsult, recall campaigns','Nikshay and HMIS reporting'],hi:['ABHA / ABDM जुड़ाव','लैब, फ़ार्मेसी, नर्सिंग होम','टेली-परामर्श, रिकॉल अभियान','Nikshay और HMIS रिपोर्टिंग']},gate:{en:'Goal: 150 paying clinics',hi:'लक्ष्य: 150 क्लिनिक'}}
];

const PLANS=[
 {t:{en:'Free',hi:'मुफ़्त'},m:0,y:0,items:{en:['1 doctor, 100 prescriptions a month','Standard letterhead','Print and PDF'],hi:['1 डॉक्टर, महीने में 100 पर्ची','सामान्य letterhead','प्रिंट और PDF']},note:{en:'Try it on a slow day.',hi:'किसी हल्के दिन आज़माएँ।'}},
 {feat:true,t:{en:'Clinic',hi:'क्लिनिक'},m:499,y:4999,items:{en:['Unlimited prescriptions','Your exact letterhead','Shorthand medicine entry','Hindi dose instructions','WhatsApp parchi and reminders (500 a month)','Templates and follow-up reminders','1 reception login'],hi:['असीमित पर्ची','आपका हूबहू letterhead','छोटे नाम से दवा','हिंदी में खुराक','WhatsApp पर्ची और रिमाइंडर (महीने में 500)','टेम्पलेट और फ़ॉलो-अप याद','1 रिसेप्शन लॉगिन']},note:{en:'For a solo GP seeing 30–80 patients a day.',hi:'रोज़ 30–80 मरीज़ देखने वाले डॉक्टर के लिए।'}},
 {t:{en:'Clinic Pro',hi:'क्लिनिक प्रो'},m:999,y:9999,items:{en:['Everything in Clinic','Listens to the consult and drafts the parchi','Photo intake of old Rx and reports','WhatsApp booking, automations and recall','Hindi voice notes for patients','Token screen and billing','3 staff logins'],hi:['क्लिनिक की सभी सुविधाएँ','बातचीत सुनकर पर्ची का ड्राफ़्ट','पुरानी पर्ची और रिपोर्ट की फ़ोटो','WhatsApp बुकिंग, ऑटोमेशन और रिकॉल','मरीज़ों के लिए हिंदी वॉइस नोट','टोकन स्क्रीन और बिलिंग','3 स्टाफ़ लॉगिन']},note:{en:'For OPDs above 60 patients a day.',hi:'रोज़ 60 से ज़्यादा मरीज़ वाले OPD के लिए।'}},
 {t:{en:'Nursing home',hi:'नर्सिंग होम'},m:799,y:7999,per:true,items:{en:['Per doctor, 2–5 doctors','Shared patients','Per-doctor letterheads','Admin reports'],hi:['प्रति डॉक्टर, 2–5 डॉक्टर','साझा मरीज़','हर डॉक्टर का letterhead','एडमिन रिपोर्ट']},note:{en:'Talk to us for hospitals.',hi:'अस्पतालों के लिए हमसे बात करें।'}}
];

const TEAM=[
 {ini:'CK',name:'Chiranjeev Kumar',role:{en:'Founder · Product and AI',hi:'संस्थापक · प्रोडक्ट और AI'},bio:{en:'GenAI engineer at Deloitte who ships RAG, agentic and document-AI systems to production. CSE from BIT Mesra, dual master’s from LJMU and IIIT Bangalore. Built Arogya Rx alongside a working clinic in Muzaffarpur.',hi:'Deloitte में GenAI इंजीनियर, जो RAG, एजेंटिक और डॉक्यूमेंट-AI सिस्टम प्रोडक्शन में लाते हैं। BIT मेसरा से CSE, LJMU और IIIT बैंगलोर से दो मास्टर्स। मुज़फ़्फ़रपुर के एक चलते क्लिनिक के साथ Arogya Rx बनाया।'},links:[['Portfolio','https://chiranjeev-ai-engineer.vercel.app'],['LinkedIn','https://linkedin.com/in/chiranjeevkumar47'],['Resume','assets/resume.pdf']]},
 {ini:'AC',name:'Arogya Clinic, Muzaffarpur',role:{en:'Clinical partner · first clinic live',hi:'क्लिनिकल पार्टनर · पहला क्लिनिक'},bio:{en:'A general-medicine practice seeing 40–50 patients a day. Every screen in Arogya Rx was shaped by its OPD: the paper-identical print, the normal-exam defaults and the comorbidity profiles.',hi:'जनरल मेडिसिन क्लिनिक, रोज़ 40–50 मरीज़। Arogya Rx की हर स्क्रीन इसी OPD से बनी: हूबहू प्रिंट, सामान्य जाँच के डिफ़ॉल्ट और पुरानी बीमारियों की प्रोफ़ाइल।'},links:[]},
 {ini:'+',name:'Your clinic',role:{en:'Founding clinic · 25 places',hi:'संस्थापक क्लिनिक · 25 स्थान'},bio:{en:'Founding clinics get the Clinic plan at ₹3,999 for the first year, free setup, and a direct line to shape what we build next.',hi:'संस्थापक क्लिनिकों को पहले साल ₹3,999 में क्लिनिक प्लान, मुफ़्त सेटअप, और आगे क्या बने इसमें सीधी भागीदारी।'},links:[['Apply','#contact']]}
];

const FAQ=[
 [{en:'Is patient data safe?',hi:'क्या मरीज़ का डेटा सुरक्षित है?'},{en:'Yes. Records are locked to your clinic: only the logins you create can open them, and you as admin decide who gets one. Reception sees only front-desk screens. Data is stored in India and encrypted, passwords are never stored, and every login and change goes into a log nobody can edit.',hi:'हाँ। रिकॉर्ड सिर्फ़ आपके क्लिनिक तक सीमित हैं: केवल आपके बनाए लॉगिन ही इन्हें खोल सकते हैं, और एडमिन के रूप में आप तय करते हैं कि किसे लॉगिन मिले। रिसेप्शन को सिर्फ़ फ़्रंट-डेस्क स्क्रीन दिखती है। डेटा भारत में और एन्क्रिप्टेड रहता है, पासवर्ड कभी सेव नहीं होते, और हर लॉगिन व बदलाव ऐसे लॉग में दर्ज होता है जिसे कोई बदल नहीं सकता।'}],
 [{en:'I’m faster with a pen.',hi:'मैं पेन से ज़्यादा तेज़ हूँ।'},{en:'Most visits match one of your ten common diagnoses. A template fills medicines, doses and advice in one tap; you change only what differs. Voice input handles the rest.',hi:'ज़्यादातर मरीज़ आपके दस आम निदानों में से किसी एक के होते हैं। टेम्पलेट एक टैप में दवा, खुराक और सलाह भर देता है; आप केवल जो अलग है बदलें। बाकी बोलकर।'}],
 [{en:'What if the internet goes down?',hi:'इंटरनेट चला जाए तो?'},{en:'The offline mode (Phase 2) keeps prescriptions and printing working. Everything syncs and WhatsApp messages go out when the connection returns.',hi:'ऑफ़लाइन मोड (चरण 2) में पर्ची और प्रिंट चलते रहते हैं। कनेक्शन लौटने पर सब सिंक हो जाता है और WhatsApp संदेश चले जाते हैं।'}],
 [{en:'Can my compounder use it?',hi:'क्या मेरा कंपाउंडर इसे चला पाएगा?'},{en:'The reception screen has only name, age, phone and complaint. It creates the token and the patient appears in your queue.',hi:'रिसेप्शन स्क्रीन में केवल नाम, उम्र, फ़ोन और तकलीफ़। टोकन बनता है और मरीज़ आपकी कतार में आ जाता है।'}],
 [{en:'Does the AI decide the treatment?',hi:'क्या AI इलाज तय करता है?'},{en:'No. Voice and photo intake create drafts and suggestions. The doctor reviews every line and nothing prints without the doctor’s confirmation.',hi:'नहीं। आवाज़ और फ़ोटो से केवल ड्राफ़्ट और सुझाव बनते हैं। डॉक्टर हर पंक्ति जाँचते हैं, उनकी मंज़ूरी के बिना कुछ नहीं छपता।'}],
 [{en:'Does it record my patients?',hi:'क्या यह मरीज़ों को रिकॉर्ड करता है?'},{en:'Only when you press Listen, and only after the patient agrees. The audio is turned into text and then discarded; only the text you approve is saved to the record.',hi:'सिर्फ़ तब जब आप Listen दबाएँ, और मरीज़ की सहमति के बाद। आवाज़ से टेक्स्ट बनता है और फिर आवाज़ हटा दी जाती है; रिकॉर्ड में सिर्फ़ वही सेव होता है जो आप मंज़ूर करें।'}],
 [{en:'How does it compare with other clinic apps?',hi:'दूसरे क्लिनिक ऐप से यह कैसे अलग है?'},{en:'Most clinic apps start when the doctor starts typing. Arogya Rx starts before the visit on WhatsApp, listens during it, and follows up in Hindi after it, at about a third of the usual yearly price.',hi:'ज़्यादातर क्लिनिक ऐप तब शुरू होते हैं जब डॉक्टर टाइप करना शुरू करते हैं। Arogya Rx मुलाक़ात से पहले WhatsApp पर, मुलाक़ात के दौरान सुनकर और बाद में हिंदी में फ़ॉलो-अप तक काम करता है, आम सालाना कीमत के लगभग एक-तिहाई में।'}],
 [{en:'Do I need a computer?',hi:'क्या कंप्यूटर ज़रूरी है?'},{en:'No. It runs in the browser on a laptop, tablet or Android phone, and prints to any printer, including on your existing pre-printed pad.',hi:'नहीं। यह लैपटॉप, टैबलेट या एंड्रॉइड फ़ोन के ब्राउज़र में चलता है, और किसी भी प्रिंटर पर छपता है, आपके छपे हुए पैड पर भी।'}]
];


/* security features shown on the landing page: [status, icon, title en, title hi, detail en, detail hi] */
const SECURITY=[
 ['in','lock','Locked to your clinic','सिर्फ़ आपके क्लिनिक तक','Every record carries your clinic’s ID and is checked on every request. A login from another clinic cannot open it.','हर रिकॉर्ड पर आपके क्लिनिक की पहचान है और हर बार जाँची जाती है। दूसरे क्लिनिक का लॉगिन इसे नहीं खोल सकता।'],
 ['in','users','One login per person, with roles','हर व्यक्ति का अलग लॉगिन, भूमिका के साथ','You, as doctor and admin, see everything. Reception sees only front-desk screens: registration, queue, vitals, appointments and bills.','डॉक्टर और एडमिन के रूप में आप सब देखते हैं। रिसेप्शन को सिर्फ़ फ़्रंट-डेस्क स्क्रीन: रजिस्ट्रेशन, कतार, वाइटल्स, अपॉइंटमेंट और बिल।'],
 ['in','ban','Remove access in one tap','एक टैप में पहुँच बंद','Switch off a staff login or change its role and every device they are signed in on is logged out at once.','किसी स्टाफ़ का लॉगिन बंद करें या भूमिका बदलें, उसके हर डिवाइस से तुरंत लॉग आउट।'],
 ['in','key','Passwords are never stored','पासवर्ड कभी सेव नहीं होते','Only a one-way scrypt hash is kept, so nobody, including us, can read your password.','सिर्फ़ एकतरफ़ा scrypt हैश रखा जाता है, इसलिए आपका पासवर्ड कोई नहीं पढ़ सकता, हम भी नहीं।'],
 ['in','shield','Encrypted on the wire and on disk','भेजते समय और रखते समय एन्क्रिप्टेड','Every page loads over HTTPS. The database and scanned files are encrypted at rest (AES-256).','हर पेज HTTPS पर खुलता है। डेटाबेस और स्कैन की गई फ़ाइलें रखते समय एन्क्रिप्टेड (AES-256)।'],
 ['in','building','Stored in India','डेटा भारत में','The database and files live in a Mumbai data centre. Scans sit in a private bucket that needs your login to open.','डेटाबेस और फ़ाइलें मुंबई के डेटा सेंटर में। स्कैन एक प्राइवेट बकेट में, जो आपके लॉगिन के बिना नहीं खुलता।'],
 ['in','server','Database closed to the internet','डेटाबेस इंटरनेट से बंद','Records sit in a private schema the public API cannot reach, with row-level security switched on for every table.','रिकॉर्ड एक प्राइवेट स्कीमा में हैं जहाँ पब्लिक API नहीं पहुँचता, और हर टेबल पर row-level security चालू है।'],
 ['in','logs','Activity log nobody can edit','ऐसा ऑडिट लॉग जिसे कोई बदल नहीं सकता','Every login and change is recorded with who, what, when and from where. Entries cannot be changed or deleted.','हर लॉगिन और बदलाव दर्ज: किसने, क्या, कब और कहाँ से। ये प्रविष्टियाँ न बदली जा सकती हैं, न मिटाई जा सकती हैं।'],
 ['in','clock','Automatic log-out','अपने-आप लॉग आउट','Sessions end after 14 hours. Changing your password signs out every other device. Repeated wrong passwords are slowed down.','14 घंटे बाद सत्र खत्म। पासवर्ड बदलते ही बाकी सभी डिवाइस से लॉग आउट। बार-बार गलत पासवर्ड पर लॉगिन धीमा हो जाता है।'],
 ['in','brain','AI only drafts','AI सिर्फ़ ड्राफ़्ट बनाता है','Voice and photo intake return drafts. Nothing is saved or printed until you review it.','आवाज़ और फ़ोटो से सिर्फ़ ड्राफ़्ट बनते हैं। आपकी जाँच के बिना कुछ सेव या प्रिंट नहीं होता।'],
 ['soon','phone','OTP login on your mobile','मोबाइल पर OTP लॉगिन','A one-time code on your mobile in addition to your password.','पासवर्ड के साथ मोबाइल पर एक बार का कोड।'],
 ['soon','save','Daily backups','रोज़ का बैकअप','A copy of your clinic’s data every day that can be restored if anything goes wrong.','हर दिन आपके क्लिनिक के डेटा की कॉपी, जिसे ज़रूरत पड़ने पर वापस लाया जा सके।'],
 ['soon','id','Patient consent and data export (DPDP)','मरीज़ की सहमति और डेटा निर्यात (DPDP)','Consent records for each patient and a full export of your data at any time, in line with the DPDP Act.','हर मरीज़ की सहमति का रिकॉर्ड और कभी भी आपके पूरे डेटा का निर्यात, DPDP कानून के अनुसार।']
].map(f=>({st:f[0],ic:f[1],t:{en:f[2],hi:f[3]},d:{en:f[4],hi:f[5]}}));

/* phrases for the scrolling strip on the landing page */
const MARQUEE=[['Your own letterhead','आपका अपना letterhead'],['Hindi dose timings','हिंदी में खुराक'],['Generic names in CAPITALS','जेनेरिक नाम बड़े अक्षरों में'],['Jan Aushadhi prices','जन औषधि की कीमतें'],['Allergy checks','एलर्जी जाँच'],['WhatsApp parchi','WhatsApp पर्ची'],['Listens to the consult','बातचीत सुनकर पर्ची'],['pcm tds 3d','pcm tds 3d'],['Hindi voice notes','हिंदी वॉइस नोट'],['Photo intake','फ़ोटो से इतिहास'],['Token queue','टोकन कतार'],['HbA1c and BP trends','HbA1c और BP ट्रेंड']].map(m=>({en:m[0],hi:m[1]}));

/* clinical reference data */
const DRUGS=[
 {id:'pcm650',g:'PARACETAMOL',s:'650 mg',f:'tab',b:'Dolo 650',bp:2.0,jp:0.7,cls:'pcm'},
 {id:'cet10',g:'CETIRIZINE',s:'10 mg',f:'tab',b:'Okacet',bp:1.8,jp:0.3,cls:'ah'},
 {id:'levo5',g:'LEVOCETIRIZINE',s:'5 mg',f:'tab',b:'Levocet',bp:3.0,jp:0.4,cls:'ah'},
 {id:'montlevo',g:'MONTELUKAST + LEVOCETIRIZINE',s:'10 mg + 5 mg',f:'tab',b:'Montair-LC',bp:14,jp:3.0,cls:'ah'},
 {id:'panto40',g:'PANTOPRAZOLE',s:'40 mg',f:'tab',b:'Pan 40',bp:10.3,jp:0.9,cls:'ppi'},
 {id:'rabdsr',g:'RABEPRAZOLE + DOMPERIDONE SR',s:'20 mg + 30 mg',f:'cap',b:'Rabekind-DSR',bp:12,jp:2.0,cls:'ppi'},
 {id:'amoxclav',g:'AMOXICILLIN + CLAVULANIC ACID',s:'500 mg + 125 mg',f:'tab',b:'Augmentin 625',bp:22,jp:7,cls:'pen'},
 {id:'azi500',g:'AZITHROMYCIN',s:'500 mg',f:'tab',b:'Azithral 500',bp:24,jp:6,cls:'mac'},
 {id:'cefix200',g:'CEFIXIME',s:'200 mg',f:'tab',b:'Taxim-O 200',bp:11,jp:3,cls:'ceph'},
 {id:'nitro100',g:'NITROFURANTOIN SR',s:'100 mg',f:'cap',b:'Martifur',bp:10,jp:3,cls:'uti'},
 {id:'cotri',g:'SULFAMETHOXAZOLE + TRIMETHOPRIM',s:'800 mg + 160 mg',f:'tab',b:'Septran DS',bp:3,jp:1,cls:'sulfa'},
 {id:'ors',g:'ORAL REHYDRATION SALTS',s:'WHO formula',f:'sach',b:'Electral',bp:21,jp:8,cls:'ors'},
 {id:'amlo5',g:'AMLODIPINE',s:'5 mg',f:'tab',b:'Amlong 5',bp:3.0,jp:0.3,cls:'ccb'},
 {id:'telmi40',g:'TELMISARTAN',s:'40 mg',f:'tab',b:'Telma 40',bp:8.5,jp:0.8,cls:'arb'},
 {id:'met500',g:'METFORMIN SR',s:'500 mg',f:'tab',b:'Glycomet SR 500',bp:2.0,jp:0.4,cls:'bg'},
 {id:'glim1',g:'GLIMEPIRIDE',s:'1 mg',f:'tab',b:'Amaryl 1',bp:6.5,jp:0.5,cls:'su'},
 {id:'ator10',g:'ATORVASTATIN',s:'10 mg',f:'tab',b:'Atorva 10',bp:8,jp:0.7,cls:'statin'},
 {id:'thy50',g:'THYROXINE SODIUM',s:'50 mcg',f:'tab',b:'Thyronorm 50',bp:1.8,jp:0.6,cls:'thy'},
 {id:'salb',g:'SALBUTAMOL INHALER',s:'100 mcg/puff',f:'inh',b:'Asthalin',bp:150,jp:70,cls:'saba'},
 {id:'ibu400',g:'IBUPROFEN',s:'400 mg',f:'tab',b:'Brufen 400',bp:1.5,jp:0.4,cls:'nsaid'},
 {id:'diclopcm',g:'DICLOFENAC + PARACETAMOL',s:'50 mg + 325 mg',f:'tab',b:'Dicloran Plus',bp:3.2,jp:0.8,cls:'pcm'},
 {id:'ond4',g:'ONDANSETRON',s:'4 mg',f:'tab',b:'Emeset 4',bp:6,jp:0.8,cls:'ae'},
 {id:'dicymef',g:'DICYCLOMINE + MEFENAMIC ACID',s:'10 mg + 250 mg',f:'tab',b:'Meftal-Spas',bp:4.5,jp:1.2,cls:'spas'},
 {id:'ferro',g:'FERROUS ASCORBATE + FOLIC ACID',s:'100 mg + 1.5 mg',f:'tab',b:'Orofer XT',bp:14,jp:2.5,cls:'iron'},
 {id:'vitd',g:'CHOLECALCIFEROL',s:'60,000 IU',f:'cap',b:'Uprise D3 60K',bp:32,jp:12,cls:'vitd'},
 {id:'calc',g:'CALCIUM CARBONATE + VITAMIN D3',s:'500 mg + 250 IU',f:'tab',b:'Shelcal 500',bp:7,jp:1.5,cls:'ca'},
 {id:'dom10',g:'DOMPERIDONE',s:'10 mg',f:'tab',b:'Domstal',bp:2.5,jp:0.4,cls:'prok'},
 {id:'coughls',g:'AMBROXOL + LEVOSALBUTAMOL + GUAIPHENESIN',s:'100 ml',f:'syp',b:'Ascoril LS',bp:118,jp:35,cls:'cough'},
 {id:'bcomp',g:'VITAMIN B-COMPLEX',s:'with B12',f:'cap',b:'Becosules',bp:2.5,jp:0.6,cls:'vit'},
 {id:'metro400',g:'METRONIDAZOLE',s:'400 mg',f:'tab',b:'Flagyl 400',bp:2,jp:0.5,cls:'nitroimid'}
];
const TPL={
 fever:{name:'Viral fever',dx:'Acute febrile illness (viral)',meds:[['pcm650','1-1-1','after',3],['cet10','0-0-1','after',5],['ors','SOS','any',3]],inv:['CBC','Dengue NS1'],adv:[0],fu:3},
 urti:{name:'URTI / sore throat',dx:'Upper respiratory tract infection',meds:[['azi500','1-0-0','after',3],['levo5','0-0-1','after',5],['pcm650','SOS','after',3]],inv:[],adv:[4,0],fu:5},
 gast:{name:'Gastritis',dx:'Acid peptic disease',meds:[['panto40','1-0-0','before',14],['dom10','1-0-1','before',5]],inv:[],adv:[3],fu:14},
 htn:{name:'HTN follow-up',dx:'Essential hypertension',meds:[['telmi40','1-0-0','any',30],['amlo5','0-0-1','any',30]],inv:['S. creatinine','Lipid profile'],adv:[1,2],fu:30},
 dm:{name:'T2DM follow-up',dx:'Type 2 diabetes mellitus',meds:[['met500','1-0-1','after',30],['glim1','1-0-0','before',30],['ator10','0-0-1','after',30]],inv:['FBS','PPBS','HbA1c'],adv:[2,6],fu:30},
 uti:{name:'UTI',dx:'Lower urinary tract infection',meds:[['nitro100','1-0-1','after',5],['pcm650','SOS','after',3]],inv:['Urine R/M','Urine C/S'],adv:[5],fu:5},
 rhin:{name:'Allergic rhinitis',dx:'Allergic rhinitis',meds:[['montlevo','0-0-1','after',10]],inv:[],adv:[4],fu:10},
 anaemia:{name:'Anaemia',dx:'Iron deficiency anaemia',meds:[['ferro','0-1-0','after',90],['vitd','Weekly','after',56]],inv:['CBC','S. ferritin'],adv:[7],fu:30}
};
const ADVICE=[
 {en:'Rest and plenty of fluids',hi:'आराम करें, खूब पानी पिएँ'},{en:'Low salt, no fried food',hi:'नमक कम, तली चीज़ें बंद'},{en:'Walk 30 minutes daily',hi:'रोज़ 30 मिनट टहलें'},{en:'Avoid spicy food and late dinner',hi:'तीखा खाना और देर रात खाना बंद'},
 {en:'Steam inhalation twice daily',hi:'दिन में दो बार भाप लें'},{en:'Drink 3 litres of water daily',hi:'रोज़ 3 लीटर पानी पिएँ'},{en:'Check sugar at home every week',hi:'हर हफ़्ते घर पर शुगर जाँचें'},{en:'Iron-rich diet: greens, jaggery, chana',hi:'हरी सब्ज़ी, गुड़, चना खाएँ'},
 {en:'Check both feet daily; never walk barefoot',hi:'रोज़ दोनों पैर देखें; नंगे पैर न चलें'},{en:'No painkillers other than paracetamol',hi:'पैरासिटामोल के अलावा कोई दर्द की दवा नहीं'},{en:'Take iron 1 hour away from tea',hi:'आयरन की गोली चाय से 1 घंटा दूर लें'},{en:'Come at once if vomiting, bleeding or drowsy',hi:'उल्टी, खून आना या बेहोशी लगे तो तुरंत आएँ'}
];
const PATIENTS=[
 {tok:1,name:'Anil Kumar',age:40,sex:'M',phone:'98xxxx2210',uhid:'SC-0388',status:'done',time:34,co:'Fever, chills',cond:[],all:[],tpl:'fever',v:{bp:'122/80',pulse:'98',temp:'100.8',spo2:'98',wt:'68'},slot:'08:10',src:'Walk-in'},
 {tok:2,name:'Meena Devi',age:58,sex:'F',phone:'97xxxx8812',uhid:'SC-0291',status:'done',time:27,co:'BP check',cond:['HTN'],all:[],tpl:'htn',v:{bp:'144/90',pulse:'80',wt:'64'},slot:'08:25',src:'WhatsApp'},
 {tok:3,name:'Ramesh Prasad',age:52,sex:'M',phone:'98xxxx4127',uhid:'SC-0412',status:'with',co:'Sugar follow-up, tingling in feet',cond:['T2DM · 6 yrs','HTN'],all:[],slot:'08:40',src:'WhatsApp',hba1c:7.2,
  summary:'Last visit 14 Aug: HbA1c 7.6%, BP 142/88. On Metformin SR 500 BD and Glimepiride 1 mg OD. Advised a 30-minute daily walk.',
  trend:{label:'HbA1c (%)',target:7,pts:[['Feb',8.4],['Apr',8.1],['Jun',7.9],['Aug',7.6],['Oct',7.2]]},
  visits:[['14 Aug 2026','T2DM follow-up','HbA1c 7.6%. Glimepiride added.'],['12 Jun 2026','T2DM follow-up','HbA1c 7.9%. Diet counselling.'],['8 Apr 2026','HTN + T2DM','Telmisartan 40 started.']],
  voice:{text:'Sugar follow-up. Pairon mein jhunjhuni hai do mahine se. BP 138 by 86, pulse 82, sugar random 186. Type 2 diabetes with early neuropathy. Metformin SR 500 subah shaam khane ke baad, glimepiride 1 mg subah nashte se pehle, atorvastatin 10 raat ko, ek mahina. B-complex ek roz. HbA1c aur lipid profile. Ek mahine baad dikhayein.',tpl:'dm',co:'Sugar follow-up. Tingling in both feet for 2 months.',v:{bp:'138/86',pulse:'82',grbs:'186',wt:'74'},dx:'Type 2 DM with early peripheral neuropathy',extra:[['bcomp','1-0-0','after',30]],inv:['Lipid profile']}},
 {tok:4,name:'Sita Devi',age:45,sex:'F',phone:'99xxxx3071',uhid:'SC-0517',status:'waiting',co:'Burning urination, 2 days',cond:[],all:['Sulfa'],slot:'09:00',src:'Walk-in',
  visits:[['2 Mar 2026','Acid peptic disease','Pantoprazole 14 days.']],
  voice:{text:'Do din se peshab mein jalan, bukhar nahi. BP 124 by 80, temp 98.8. Lower UTI. Nitrofurantoin 100 subah shaam khane ke baad paanch din, dard ke liye paracetamol zaroorat par. Urine routine aur culture. Teen litre paani roz. Paanch din baad.',tpl:'uti',co:'Burning urination for 2 days. No fever.',v:{bp:'124/80',temp:'98.8',pulse:'84',wt:'58'},dx:'Lower urinary tract infection'}},
 {tok:5,name:'Mohd. Arif',age:28,sex:'M',phone:'91xxxx6640',uhid:'SC-0533',status:'waiting',co:'Fever 3 days, body ache',cond:[],all:[],slot:'09:20',src:'WhatsApp',
  voice:{text:'Teen din se bukhar, body ache aur gale mein kharash. BP 118 by 76, pulse 96, temp 101.2, SpO2 98. Viral fever. Paracetamol 650 teen baar khane ke baad teen din, cetirizine raat ko paanch din, ORS. CBC aur dengue NS1. Teen din baad dikhayein.',tpl:'fever',co:'Fever for 3 days with body ache and sore throat.',v:{bp:'118/76',pulse:'96',temp:'101.2',spo2:'98',wt:'66'},dx:'Acute febrile illness (viral)'}},
 {tok:6,name:'Sunita Kumari',age:34,sex:'F',phone:'70xxxx1185',uhid:'SC-0540',status:'waiting',co:'Weakness, giddiness for a month',cond:[],all:[],slot:'09:40',src:'WhatsApp',
  voice:{text:'Ek mahine se kamzori aur chakkar. Pallor hai. BP 104 by 68, pulse 92. Iron deficiency anaemia. Ferrous ascorbate folic acid dopahar khane ke baad teen mahine, vitamin D3 60K hafte mein ek baar aath hafte. CBC, serum ferritin. Ek mahine baad.',tpl:'anaemia',co:'Weakness and giddiness for 1 month. Pallor present.',v:{bp:'104/68',pulse:'92',wt:'49'},dx:'Iron deficiency anaemia'}},
 {tok:7,name:'Rajesh Singh',age:61,sex:'M',phone:'94xxxx9032',uhid:'SC-0102',status:'waiting',co:'BP check, morning headache',cond:['HTN · 9 yrs','T2DM'],all:['Penicillin'],slot:'10:00',src:'Walk-in',hba1c:7.8,
  trend:{label:'Systolic BP (mmHg)',target:140,pts:[['Feb',158],['Apr',150],['Jun',146],['Aug',149],['Oct',152]]},
  visits:[['20 Aug 2026','HTN follow-up','BP 149/92. Salt counselling.'],['18 Jun 2026','HTN follow-up','BP 146/90.']],
  voice:{text:'BP check, subah sir dard. BP 152 by 94, pulse 78. Hypertension, uncontrolled. Telmisartan 40 subah, amlodipine 5 raat, ek mahina. Serum creatinine, lipid profile. Namak kam. Ek mahine baad.',tpl:'htn',co:'Morning headache. BP check.',v:{bp:'152/94',pulse:'78',wt:'79'},dx:'Essential hypertension, uncontrolled'}},
 {tok:8,name:'Pooja Kumari',age:19,sex:'F',phone:'62xxxx4471',uhid:'SC-0545',status:'waiting',co:'Sneezing, runny nose',cond:[],all:[],slot:'10:20',src:'WhatsApp',
  voice:{text:'Teen din se chheenk aur naak behna, aankhon mein khujli. Temp normal. Allergic rhinitis. Montelukast levocetirizine raat ko das din. Bhaap lena. Das din baad agar zaroorat ho.',tpl:'rhin',co:'Sneezing, running nose and itchy eyes for 3 days.',v:{temp:'98.4',pulse:'76',wt:'52'},dx:'Allergic rhinitis'}}
];
const INTAKE_CHAT=[
 ['in','Namaste, Dr. Sinha se milna hai. Kal subah ka time milega?'],
 ['out','नमस्ते! कल (शनिवार) के लिए खाली समय: 9:20, 10:40, 11:00। कौन सा चाहिए? नाम और उम्र भी लिखें।'],
 ['in','10:40. Kavita Sharma, 38'],
 ['out','टोकन 9 बुक हो गया ✔ 10:40 बजे। क्या तकलीफ़ है? पुरानी पर्ची या रिपोर्ट हो तो फ़ोटो भेज दें।'],
 ['in','Thyroid ki dawai chal rahi hai, 2 hafte se thakan aur baal jhad rahe hain'],
 ['in','📎 TSH_report.jpg'],
 ['out','धन्यवाद। रिपोर्ट मिल गई। डॉक्टर साहब को आपकी जानकारी पहले से भेज दी गई है। कल मिलते हैं।']
];

/* more medicines, so shorthand search has something to chew on */
DRUGS.push(
 {id:'ofl200',g:'OFLOXACIN',s:'200 mg',f:'tab',b:'Zanocin 200',bp:6,jp:1.2,cls:'fq'},
 {id:'doxy100',g:'DOXYCYCLINE',s:'100 mg',f:'cap',b:'Doxt-SL',bp:6,jp:1.5,cls:'tet'},
 {id:'cefpo200',g:'CEFPODOXIME',s:'200 mg',f:'tab',b:'Cepodem 200',bp:18,jp:4,cls:'ceph'},
 {id:'losar50',g:'LOSARTAN',s:'50 mg',f:'tab',b:'Losar 50',bp:5,jp:0.6,cls:'arb'},
 {id:'meto25',g:'METOPROLOL SUCCINATE ER',s:'25 mg',f:'tab',b:'Met XL 25',bp:6,jp:1.0,cls:'bb'},
 {id:'asp75',g:'ASPIRIN',s:'75 mg',f:'tab',b:'Ecosprin 75',bp:0.6,jp:0.2,cls:'antiplt'},
 {id:'clop75',g:'CLOPIDOGREL',s:'75 mg',f:'tab',b:'Clopilet 75',bp:7,jp:0.9,cls:'antiplt'},
 {id:'ome20',g:'OMEPRAZOLE',s:'20 mg',f:'cap',b:'Omez 20',bp:5,jp:0.7,cls:'ppi'},
 {id:'alb400',g:'ALBENDAZOLE',s:'400 mg',f:'tab',b:'Zentel',bp:12,jp:3,cls:'anth'},
 {id:'flu150',g:'FLUCONAZOLE',s:'150 mg',f:'tab',b:'Forcan 150',bp:15,jp:3,cls:'az'},
 {id:'pred10',g:'PREDNISOLONE',s:'10 mg',f:'tab',b:'Wysolone 10',bp:1.2,jp:0.3,cls:'ster'},
 {id:'mont10',g:'MONTELUKAST',s:'10 mg',f:'tab',b:'Montair 10',bp:13,jp:2,cls:'lt'}
);
/* short names doctors actually type: brand stems, abbreviations, Hindi-ish nicknames */
const ALIAS={pcm650:['pcm','para','dolo','crocin','calpol'],cet10:['cet','cetz','okacet','alerid'],levo5:['levocet','lcz'],montlevo:['mont','montair lc','mlc','montek'],panto40:['pan','panto','pantop'],rabdsr:['rab','rabe','dsr','razo'],amoxclav:['amox','augmentin','aug','clav','amc'],azi500:['azi','azee','azithral','azith'],cefix200:['cef','cefix','taxim','zifi'],nitro100:['nitro','martifur','nf'],cotri:['cotri','septran','sxt','bactrim'],ors:['ors','electral'],amlo5:['amlo','amlong','aml'],telmi40:['telmi','telma','tel'],met500:['met','metf','glycomet','mf'],glim1:['glim','glimi','amaryl'],ator10:['ator','atorva','statin'],thy50:['thy','thyro','thyronorm','eltroxin'],salb:['salb','asthalin','sal'],ibu400:['ibu','brufen'],diclopcm:['diclo','dicloran'],ond4:['ond','emeset','zofer'],dicymef:['mef','meftal','spas'],ferro:['iron','orofer','fe'],vitd:['d3','vitd','uprise','60k'],calc:['cal','shelcal','calcium'],dom10:['dom','domstal'],coughls:['ascoril','cough','ls'],bcomp:['bcom','becosules','b12'],metro400:['metro','flagyl'],ofl200:['oflox','oflo','zanocin'],doxy100:['doxy','doxt'],cefpo200:['cefpo','cepodem'],losar50:['losar','los'],meto25:['meto','metxl'],asp75:['asp','ecosprin'],clop75:['clop','clopi'],ome20:['ome','omez'],alb400:['alb','zentel'],flu150:['fluco','forcan'],pred10:['pred','wysolone'],mont10:['monte','montair']};
DRUGS.forEach(d=>{d.al=ALIAS[d.id]||[];});
/* the doctor's most-used medicines, shown as one-tap chips */
const FAVS=['pcm650','azi500','panto40','cet10','met500','telmi40','amlo5','ors'];

/* ambient consult scripts: [speaker, words, facts]. Speakers: D doctor, P patient, S compounder.
   Facts: co complaint · hx history · v vital · all allergy · dx diagnosis · med [id,freq,timing,days] · inv test · adv advice index · fu days · ask [question en, answer en, answer hi] · flag safety note */
const CONVO={
 3:[['D','Namaste Ramesh ji, baithiye. Sugar ki dawa theek se chal rahi hai?',[]],
  ['P','Haan doctor sahab, dono time le raha hoon. Par do mahine se pairon mein jhunjhuni hoti hai, raat ko zyada.',[['co','Tingling in both feet for 2 months, worse at night']]],
  ['D','Sunnapan bhi hai? Chot lage to pata chalta hai?',[]],
  ['P','Thoda sunn lagta hai. Pichhle hafte chappal mein kaanta chubha, pata hi nahi chala.',[['hx','Numbness; did not feel a thorn last week']]],
  ['S','Sir, BP 138 by 86, pulse 82, random sugar 186, weight 74 kilo.',[['v','bp','138/86'],['v','pulse','82'],['v','grbs','186'],['v','wt','74']]],
  ['D','HbA1c 7.2 aaya hai, pehle se behtar. Ye sugar ki wajah se shuruaati neuropathy hai.',[['dx','Type 2 DM with early peripheral neuropathy']]],
  ['D','Metformin SR 500 subah shaam khane ke baad, glimepiride 1 mg subah nashte se pehle, atorvastatin 10 raat ko, aur B-complex subah. Ek mahina.',[['med','met500','1-0-1','after',30],['med','glim1','1-0-0','before',30],['med','ator10','0-0-1','after',30],['med','bcomp','1-0-0','after',30]]],
  ['P','Doctor sahab, mithai bilkul band karni padegi?',[['ask','Do I have to stop sweets completely?','Not completely, but not every day. A small piece after a meal now and then is fine.','पूरी तरह नहीं, पर रोज़ नहीं। कभी-कभी खाने के बाद थोड़ा सा ले सकते हैं।']]],
  ['D','Bilkul band nahi, par roz nahi. Kabhi kabhi khane ke baad thoda sa. Roz aadha ghanta paidal chaliye, aur pairon ko roz dekhiye, nange pair mat chaliye.',[['adv',2],['adv',8]]],
  ['D','FBS, PPBS, HbA1c aur lipid profile karwa ke ek mahine baad aaiye.',[['inv','FBS'],['inv','PPBS'],['inv','HbA1c'],['inv','Lipid profile'],['fu',30]]]],
 4:[['D','Kya takleef hai Sita ji?',[]],
  ['P','Do din se peshab mein jalan hai, baar baar jaana padta hai.',[['co','Burning urination and frequency for 2 days']]],
  ['D','Bukhar ya kamar mein dard?',[]],
  ['P','Nahi, bukhar nahi hai. Kamar bhi theek hai.',[['hx','No fever, no flank pain']]],
  ['S','BP 124 by 80, temperature 98.8.',[['v','bp','124/80'],['v','temp','98.8']]],
  ['D','Pehle kisi dawa se reaction hua hai kabhi?',[]],
  ['P','Haan, Septran khayi thi to poore sharir mein daane nikal aaye the.',[['all','Sulfa'],['flag','Reaction to Septran (sulfa) recorded. Co-trimoxazole will be blocked for this patient.']]],
  ['D','Theek hai, wo nahi denge. Ye lower UTI hai.',[['dx','Lower urinary tract infection']]],
  ['D','Nitrofurantoin 100 subah shaam khane ke baad paanch din. Dard ho to paracetamol. Urine routine aur culture karwa lijiye.',[['med','nitro100','1-0-1','after',5],['med','pcm650','SOS','after',3],['inv','Urine R/M'],['inv','Urine C/S']]],
  ['P','Paani kitna peena hai?',[['ask','How much water should I drink?','About 3 litres a day.','रोज़ लगभग 3 लीटर।']]],
  ['D','Roz teen litre. Paanch din baad dikhaiye.',[['adv',5],['fu',5]]]],
 5:[['D','Kab se bukhar hai Arif?',[]],
  ['P','Teen din se. Badan dard hai aur gale mein kharash.',[['co','Fever for 3 days, body ache, sore throat']]],
  ['D','Ulti, dast, kahin se khoon, pet mein dard?',[]],
  ['P','Nahi, bas kamzori lag rahi hai.',[['hx','No vomiting, bleeding or abdominal pain']]],
  ['S','Temp 101.2, pulse 96, BP 118 by 76, oxygen 98.',[['v','temp','101.2'],['v','pulse','96'],['v','bp','118/76'],['v','spo2','98']]],
  ['D','Viral fever lag raha hai. Dengue ka mausam hai, CBC aur NS1 karwa lijiye.',[['dx','Acute febrile illness (viral), dengue to be ruled out'],['inv','CBC'],['inv','Dengue NS1']]],
  ['D','Paracetamol 650 teen baar khane ke baad teen din, cetirizine raat ko paanch din, aur ORS.',[['med','pcm650','1-1-1','after',3],['med','cet10','0-0-1','after',5],['med','ors','SOS','any',3]]],
  ['P','Dard ke liye ibuprofen le sakta hoon?',[['ask','Can I take ibuprofen for the pain?','No. Until dengue is ruled out, take only paracetamol.','नहीं। डेंगू की जाँच आने तक सिर्फ़ पैरासिटामोल लें।'],['flag','Avoid NSAIDs until dengue is ruled out.']]],
  ['D','Nahi, report aane tak sirf paracetamol. Aaram, khoob paani. Ulti ya khoon dikhe to turant aaiye. Teen din baad report ke saath.',[['adv',9],['adv',0],['adv',11],['fu',3]]]],
 6:[['D','Batayiye Sunita ji.',[]],
  ['P','Ek mahine se kamzori hai, uthne par chakkar aata hai.',[['co','Weakness and giddiness for a month']]],
  ['D','Periods kaise hain?',[]],
  ['P','Kaafi zyada bleeding hoti hai, saat din tak.',[['hx','Heavy menstrual bleeding, 7 days']]],
  ['S','BP 104 by 68, pulse 92.',[['v','bp','104/68'],['v','pulse','92']]],
  ['D','Aankhein aur nakhun pale hain. Khoon ki kami lag rahi hai.',[['dx','Iron deficiency anaemia']]],
  ['D','Ferrous ascorbate folic acid dopahar khane ke baad teen mahine, vitamin D3 60K hafte mein ek baar aath hafte. CBC aur ferritin.',[['med','ferro','0-1-0','after',90],['med','vitd','Weekly','after',56],['inv','CBC'],['inv','S. ferritin']]],
  ['P','Ye goli chai ke saath le sakti hoon?',[['ask','Can I take the tablet with tea?','Keep it an hour away from tea; take it with water or lemon water.','चाय से 1 घंटा दूर लें; पानी या नींबू-पानी के साथ।']]],
  ['D','Chai se ek ghanta door. Hari sabzi, gud, chana khaiye. Gynae se bhi dikhwa lijiye. Ek mahine baad aaiye.',[['adv',10],['adv',7],['flag','Referral: gynaecology review for heavy bleeding.'],['fu',30]]]],
 7:[['D','Rajesh ji, BP ki dawa le rahe hain?',[]],
  ['P','Subah sir mein dard rehta hai. Dawa kabhi kabhi bhool jaata hoon.',[['co','Morning headache'],['hx','Misses BP medicine on some days']]],
  ['S','BP 152 by 94, pulse 78.',[['v','bp','152/94'],['v','pulse','78']]],
  ['D','BP control mein nahi hai. Telmisartan 40 subah, amlodipine 5 raat ko, ek mahina. Creatinine aur lipid profile.',[['dx','Essential hypertension, uncontrolled'],['med','telmi40','1-0-0','any',30],['med','amlo5','0-0-1','any',30],['inv','S. creatinine'],['inv','Lipid profile']]],
  ['P','Dawa yaad kaise rahegi?',[['ask','How will I remember the medicine?','A WhatsApp reminder will come every morning.','हर सुबह WhatsApp पर याद दिलाया जाएगा।'],['flag','Daily WhatsApp dose reminder switched on.']]],
  ['D','Roz subah WhatsApp par yaad dilayenge. Namak kam. Ek mahine baad.',[['adv',1],['fu',30]]]],
 8:[['D','Kya hua Pooja?',[]],
  ['P','Teen din se chheenk aa rahi hai, naak beh rahi hai, aankhon mein khujli.',[['co','Sneezing, runny nose and itchy eyes for 3 days']]],
  ['S','Temperature normal, 98.4.',[['v','temp','98.4']]],
  ['D','Allergic rhinitis hai. Montelukast levocetirizine raat ko das din. Bhaap lijiye.',[['dx','Allergic rhinitis'],['med','montlevo','0-0-1','after',10],['adv',4]]],
  ['P','Is dawa se neend aayegi kya? Exam chal rahe hain.',[['ask','Will this medicine make me sleepy? I have exams.','It can, a little. That is why it is taken at night.','थोड़ी आ सकती है, इसलिए रात को लेनी है।']]],
  ['D','Thodi aa sakti hai, isliye raat ko. Das din baad zaroorat ho to aaiye.',[['fu',10]]]]
};
/* for walk-ins added from the schedule */
const CONVO_GENERIC=[['D','Batayiye, kya takleef hai?',[]],['P','Teen din se bukhar aur badan dard.',[['co','Fever and body ache for 3 days']]],['S','BP 120 by 80, temp 100.6.',[['v','bp','120/80'],['v','temp','100.6']]],['D','Viral fever hai. Paracetamol 650 teen baar, cetirizine raat ko. CBC. Teen din baad.',[['dx','Acute febrile illness (viral)'],['med','pcm650','1-1-1','after',3],['med','cet10','0-0-1','after',5],['inv','CBC'],['fu',3]]]];
/* last visit's medicines, for one-tap repeat */
const LASTRX={7:{date:'20 Aug 2026',meds:[['telmi40','1-0-0','any',30],['amlo5','0-0-1','any',30]]},2:{date:'22 Sep 2026',meds:[['telmi40','1-0-0','any',30]]}};

/* WhatsApp inbox for the demo */
const WA_THREADS=[
 {id:'kavita',name:'Kavita Sharma',tag:'New booking',tcls:'acc',last:'📎 TSH_report.jpg',time:'09:12',play:true},
 {id:'ramesh',name:'Ramesh Prasad',tag:'Follow-up booked',tcls:'good',last:'1',time:'08:55',msgs:[['out','नमस्ते रमेश जी, कल आपका शुगर फ़ॉलो-अप है। 1 लिखें तो टोकन बुक हो जाएगा, 2 लिखें तो दूसरा दिन।'],['in','1'],['out','टोकन 3 बुक ✔ कल सुबह 8:40। खाली पेट की शुगर जाँच करवाकर आएँ।']]},
 {id:'arif',name:'Mohd. Arif',tag:'Answered from parchi',tcls:'good',last:'Dawa khane ke baad leni hai na?',time:'08:31',msgs:[['in','Doctor sahab ne jo bukhar ki dawa di, khane ke baad leni hai na?'],['out','जी हाँ। डॉ. सिन्हा की पर्ची के अनुसार: पैरासिटामोल 650, दिन में 3 बार, खाने के बाद, 3 दिन। सेट्रीज़ीन रात को खाने के बाद।'],['out','उल्टी, खून आना या बेहोशी लगे तो तुरंत क्लिनिक आएँ।']],note:'Answered only from the doctor’s own prescription. New medical questions go to the doctor.'},
 {id:'neha',name:'Neha Gupta',tag:'Sent to doctor',tcls:'warn',last:'Kya main pills band kar doon?',time:'08:02',msgs:[['in','PCOS ki dawa se ulti jaisa lag raha hai, kya main pills band kar doon?'],['out','धन्यवाद। यह सवाल डॉक्टर साहब को भेज दिया गया है। वे आज शाम तक जवाब देंगे। परेशानी ज़्यादा हो तो क्लिनिक आएँ।']],note:'Clinical question: the assistant never advises. It routes to the doctor’s inbox.'},
 {id:'unknown',name:'+91 98xxx 44120',tag:'Clinic info',tcls:'',last:'Fees kitni hai?',time:'07:46',msgs:[['in','Fees kitni hai aur Sunday ko khula hai?'],['out','डॉ. सिन्हा की फ़ीस ₹500 है (7 दिन में दोबारा दिखाना मुफ़्त)। समय: सुबह 8–11, शाम 5–8। रविवार बंद। समय बुक करने के लिए "बुक" लिखें।']]}
];
/* automations: [id, on, title en, title hi, when, sample message (hi)] */
const WA_AUTO=[
 ['confirm',true,'Booking confirmation','बुकिंग की पुष्टि','As soon as a slot is booked','टोकन 9 बुक हो गया ✔ शनिवार 10:40, सिन्हा क्लिनिक। मैप: (लिंक)'],
 ['remind',true,'Reminder with reschedule button','दोबारा समय चुनने के बटन के साथ रिमाइंडर','24 hours and 2 hours before','कल 10:40 बजे डॉ. सिन्हा से आपका अपॉइंटमेंट है। [आ रहे हैं] [समय बदलें] [रद्द करें]'],
 ['turn',true,'“Your turn is next”','“आपका नंबर आने वाला है”','When 2 tokens are left','टोकन 9: आपसे पहले 2 मरीज़ हैं। लगभग 10 मिनट में आपका नंबर।'],
 ['rx',true,'Parchi PDF + Hindi dose schedule','पर्ची PDF + हिंदी में खुराक','When the doctor saves','डॉ. सिन्हा की पर्ची संलग्न है। दवा ऐसे लें: पैरासिटामोल, 1 गोली, सुबह-दोपहर-रात, खाने के बाद, 3 दिन।'],
 ['voice',true,'Hindi voice note of doses','खुराक का हिंदी वॉइस नोट','With the parchi','🔊 0:24 · “नमस्ते, आपकी दवाइयाँ ऐसे लेनी हैं…”'],
 ['refill',true,'Refill reminder for chronic medicines','पुरानी बीमारी की दवा खत्म होने से पहले याद','3 days before tablets run out','रमेश जी, आपकी शुगर की दवा 3 दिन में खत्म होगी। 1 लिखें, डॉक्टर से दोबारा पर्ची के लिए टोकन बुक हो जाएगा।'],
 ['followup',true,'Follow-up recall','फ़ॉलो-अप याद','The day before the follow-up date','कल आपका दोबारा दिखाने का दिन है। 1 लिखें तो टोकन बुक हो जाएगा।'],
 ['reports',false,'Ask for reports before the visit','मुलाक़ात से पहले रिपोर्ट माँगें','After booking','पुरानी पर्ची या जाँच रिपोर्ट हो तो यहीं फ़ोटो भेज दें, डॉक्टर साहब पहले से देख लेंगे।']
];
/* recall segments built from the clinic's own records */
const RECALL=[
 {id:'hba1c',en:'Diabetics with HbA1c overdue (90+ days)',hi:'जिनका HbA1c 90+ दिन से नहीं हुआ',n:46,msg:'नमस्ते {name} जी, आपकी HbA1c जाँच 3 महीने से नहीं हुई है। डॉ. सिन्हा ने इस हफ़्ते दिखाने को कहा है। 1 लिखें, टोकन बुक हो जाएगा।'},
 {id:'bp',en:'Hypertensives who missed follow-up',hi:'BP के मरीज़ जो फ़ॉलो-अप पर नहीं आए',n:31,msg:'नमस्ते {name} जी, आपका BP फ़ॉलो-अप छूट गया है। दवा बीच में बंद न करें। 1 लिखें, टोकन बुक हो जाएगा।'},
 {id:'anc',en:'Pregnant women due for ANC visit',hi:'गर्भवती महिलाएँ, जिनकी ANC जाँच बाकी है',n:9,msg:'नमस्ते {name} जी, आपकी अगली ANC जाँच इस हफ़्ते है। 1 लिखें, टोकन बुक हो जाएगा।'}
];

window.ARX={svg,MARQUEE,FEATURES,SECURITY,ROADMAP,PLANS,TEAM,FAQ,DRUGS,TPL,ADVICE,PATIENTS,INTAKE_CHAT,
 CONVO,CONVO_GENERIC,LASTRX,FAVS,WA_THREADS,WA_AUTO,RECALL,
 INV:['CBC','Dengue NS1','FBS','PPBS','HbA1c','Lipid profile','S. creatinine','Urine R/M','Urine C/S','TSH','S. ferritin','Chest X-ray','ECG'],
 COMPLAINTS:['Fever','Cough','Body ache','Headache','Burning urination','Acidity','Giddiness','Weakness','Sneezing','BP check','Sugar follow-up']};
})();
