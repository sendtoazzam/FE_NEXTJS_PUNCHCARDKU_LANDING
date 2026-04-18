"use client";

import { FormEvent, useMemo, useState } from "react";

type SignUpForm = {
  companyName: string;
  code: string;
  ssmNumber: string;
  taxId: string;
  address: string;
  state: string;
  postcode: string;
  city: string;
  country: string;
  businessRegistrationType: string;
  employeeCountRange: string;
  industry: string;
  agreeTerms: boolean;
  websiteUrl: string;
  email: string;
  phone: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPhone: string;
  adminPassword: string;
  adminPasswordConfirmation: string;
  seed: boolean;
  websiteTrap: string;
};

type FieldErrors = Partial<
  Record<
    | "companyName"
    | "ssmNumber"
    | "taxId"
    | "address"
    | "state"
    | "postcode"
    | "city"
    | "country"
    | "websiteUrl"
    | "email"
    | "adminFirstName"
    | "adminEmail"
    | "adminPassword",
    string
  >
> &
  Partial<Record<"employeeCountRange" | "agreeTerms", string>>;

const EMPLOYEE_COUNT_OPTIONS = ["1-10", "11-50", "51-200", "201-500", "500+"] as const;
const INDUSTRY_OPTIONS = ["Technology", "Retail", "Manufacturing", "Healthcare", "Education", "Hospitality", "Professional Services", "Construction", "Logistics", "Other"] as const;
const COUNTRY_OPTIONS = ["Malaysia", "Singapore", "Brunei", "Indonesia", "Thailand"] as const;
const MALAYSIA_STATE_OPTIONS = ["Johor", "Kedah", "Kelantan", "Malacca", "Negeri Sembilan", "Pahang", "Penang", "Perak", "Perlis", "Sabah", "Sarawak", "Selangor", "Terengganu", "Kuala Lumpur", "Labuan", "Putrajaya"] as const;
const BUSINESS_REGISTRATION_TYPE_OPTIONS = [
  { value: "", label: "Select registration type (optional)" },
  { value: "sdn_bhd", label: "Sdn Bhd" },
  { value: "berhad", label: "Berhad" },
  { value: "enterprise", label: "Enterprise" },
  { value: "sole_proprietorship", label: "Sole Proprietorship" },
  { value: "partnership", label: "Partnership" },
  { value: "plt", label: "PLT" },
  { value: "other", label: "Other" },
] as const;
type PolicyModalType = "terms" | "privacy" | null;

const INITIAL_FORM: SignUpForm = {
  companyName: "",
  code: "",
  ssmNumber: "",
  taxId: "",
  address: "",
  state: "",
  postcode: "",
  city: "",
  country: "Malaysia",
  businessRegistrationType: "",
  employeeCountRange: "1-10",
  industry: "",
  agreeTerms: false,
  websiteUrl: "",
  email: "",
  phone: "",
  adminFirstName: "",
  adminLastName: "",
  adminEmail: "",
  adminPhone: "",
  adminPassword: "",
  adminPasswordConfirmation: "",
  seed: true,
  websiteTrap: "",
};

const CompanySignUpPage: React.FC = () => {
  const [form, setForm] = useState<SignUpForm>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [showPasswords, setShowPasswords] = useState(false);
  const [policyModal, setPolicyModal] = useState<PolicyModalType>(null);
  const [step, setStep] = useState(1);

  const apiBase = useMemo(() => (process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://127.0.0.1:8000/api").replace(/\/$/, ""), []);
  const adminPortalUrl = useMemo(() => (process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || process.env.NEXT_PUBLIC_ADMIN_URL || "https://admin.punchcardku.com").trim(), []);

  const generateCompanyCode = (name: string): string => {
    const normalized = name.toUpperCase().replace(/SDN\s*BHD/gi, "").replace(/[^A-Z0-9\s]/g, " ").trim();
    const words = normalized.split(/\s+/).filter(Boolean);
    if (words.length === 0) return "";
    const base = words.length === 1
      ? words[0].slice(0, 8)
      : words.slice(0, 4).map((w) => w[0] || "").join("").slice(0, 8);

    if (base.length >= 6) return base;

    // Deterministic alphanumeric suffix so short names still produce >= 6 chars.
    const hash = normalized.split("").reduce((acc, ch) => ((acc * 31) + ch.charCodeAt(0)) >>> 0, 7);
    const suffix = hash.toString(36).toUpperCase() || "A1";
    const padded = `${base}${suffix}`.replace(/[^A-Z0-9]/g, "");

    return padded.length >= 6 ? padded.slice(0, 8) : `${padded}000000`.slice(0, 6);
  };

  const validateForm = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!form.companyName.trim()) e.companyName = "Company name is required.";
    if (!form.ssmNumber.trim()) e.ssmNumber = "SSM number is required.";
    if (!form.taxId.trim()) e.taxId = "Tax ID is required.";
    if (!form.address.trim()) e.address = "Company address is required.";
    if (!form.state.trim()) e.state = "State is required.";
    if (!form.postcode.trim()) e.postcode = "Postcode is required.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!form.country.trim()) e.country = "Country is required.";
    if (!EMPLOYEE_COUNT_OPTIONS.includes(form.employeeCountRange as (typeof EMPLOYEE_COUNT_OPTIONS)[number])) {
      e.employeeCountRange = "Employee count range is required.";
    }
    if (!form.agreeTerms) e.agreeTerms = "You must agree to the terms to continue.";
    if (!form.adminFirstName.trim()) e.adminFirstName = "Admin first name is required.";
    if (!form.adminEmail.trim()) e.adminEmail = "Admin email is required.";
    if (form.adminEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.adminEmail.trim())) e.adminEmail = "Please enter a valid admin email.";
    if (!form.adminPassword) e.adminPassword = "Admin password is required.";
    if (form.adminPassword && form.adminPassword.length < 6) e.adminPassword = "Admin password must be at least 6 characters.";
    if (!form.adminPasswordConfirmation || form.adminPassword !== form.adminPasswordConfirmation) e.adminPassword = "Admin password confirmation does not match.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid company email.";
    if (form.websiteUrl.trim()) {
      try { new URL(/^https?:\/\//i.test(form.websiteUrl.trim()) ? form.websiteUrl.trim() : `https://${form.websiteUrl.trim()}`); } catch { e.websiteUrl = "Please enter a valid website URL."; }
    }
    return e;
  };

  const stepKeys: Record<number, Array<keyof FieldErrors>> = {
    1: ["companyName", "employeeCountRange", "ssmNumber", "taxId"],
    2: ["address", "state", "postcode", "city", "country", "email", "websiteUrl"],
    3: ["adminFirstName", "adminEmail", "adminPassword", "agreeTerms"],
  };

  const nextStep = (): void => {
    const all = validateForm();
    const filtered = Object.fromEntries(Object.entries(all).filter(([k]) => stepKeys[step].includes(k as keyof FieldErrors))) as FieldErrors;
    if (Object.keys(filtered).length) { setFieldErrors((p) => ({ ...p, ...filtered })); setError("Please fix the highlighted fields and try again."); return; }
    setError(null); setStep((s) => Math.min(3, s + 1));
  };

  const inputClass = (error?: string): string =>
    `w-full rounded-lg border bg-transparent px-4 py-2.5 ${error ? "border-red-400/70" : "border-foreground/20"}`;
  const selectClass = (error?: string): string =>
    `select min-h-12 w-full rounded-lg border bg-background px-4 py-2.5 ${error ? "border-red-400/70" : "border-foreground/20"}`;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); setSuccess(null); setFieldErrors({});
    if (form.websiteTrap.trim() !== "") return setError("Request rejected.");
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length) { setFieldErrors(nextErrors); return setError("Please fix the highlighted fields and try again."); }
    setSubmitting(true);
    try {
      const res = await fetch(`${apiBase}/auth/v1/company-signup`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({
        name: form.companyName.trim(), code: form.code.trim() || null, ssm_number: form.ssmNumber.trim(), tax_id: form.taxId.trim(),
        business_registration_type: form.businessRegistrationType || null, address_line: form.address.trim() || null, state: form.state.trim(),
        postcode: form.postcode.trim(), city: form.city.trim(), country: form.country.trim(), employee_count_range: form.employeeCountRange,
        industry: form.industry.trim() || null, agree_terms: form.agreeTerms,
        website: form.websiteUrl.trim() ? (/^https?:\/\//i.test(form.websiteUrl.trim()) ? form.websiteUrl.trim() : `https://${form.websiteUrl.trim()}`) : null,
        address: `${form.address.trim()}, ${form.postcode.trim()} ${form.city.trim()}, ${form.country.trim()}`,
        email: form.email.trim() || null, phone: form.phone.trim() || null, seed: true, website_trap: form.websiteTrap,
        admin_new_user: { first_name: form.adminFirstName.trim(), last_name: form.adminLastName.trim() || null, email: form.adminEmail.trim(), username: form.adminEmail.trim().split("@")[0] || null, phone_number: form.adminPhone.trim() || null, password: form.adminPassword },
      }) });
      const payload = await res.json();
      if (!res.ok || payload?.success !== true) throw new Error(payload?.error?.message || payload?.message || "Failed to provision company.");
      setSuccess(`Success! ${(payload?.data?.company?.name || payload?.data?.name || form.companyName)} has been created. Please continue to ${adminPortalUrl} to sign in.`);
      setSuccessModalOpen(true);
      setForm(INITIAL_FORM); setStep(1);
    } catch (err) { setError(err instanceof Error ? err.message : "Unexpected error, please try again."); } finally { setSubmitting(false); }
  };

  return (
    <section className="pt-28 pb-16"><div className="mx-auto max-w-3xl px-5"><div className="relative rounded-2xl border border-foreground/15 bg-background p-6 shadow-lg md:p-8">
      {submitting && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-background/80 backdrop-blur-sm">
          <span className="loading loading-spinner loading-lg text-primary" aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-foreground">Provisioning your company workspace...</p>
        </div>
      )}
      <h1 className="text-3xl font-semibold">Start your company workspace</h1>
      <p className="mt-3 text-foreground-accent">Submit your company details and we will provision your dedicated Punchcardku database and admin access.</p>
      <form noValidate onSubmit={onSubmit} className="mt-8 space-y-6">
        {error && <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}
        {success && <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{success}</div>}
        <ul className="steps steps-vertical w-full md:steps-horizontal"><li className={`step ${step >= 1 ? "step-primary" : ""}`}>Company Details</li><li className={`step ${step >= 2 ? "step-primary" : ""}`}>Company Address</li><li className={`step ${step >= 3 ? "step-primary" : ""}`}>User In-Charge</li></ul>
        {step === 1 && <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2"><span className="text-sm font-semibold">Company name *</span><input placeholder="e.g. ACME CORPORATION" value={form.companyName} onChange={(ev) => { const nextCompanyName = ev.target.value.toUpperCase(); setForm((p) => ({ ...p, companyName: nextCompanyName, code: generateCompanyCode(nextCompanyName) })); }} className={inputClass(fieldErrors.companyName)} /></label>
          <label className="space-y-2"><span className="text-sm font-semibold">Company code</span><input placeholder="Auto-generated (min 6 chars)" value={form.code} readOnly className="w-full rounded-lg border border-foreground/20 bg-transparent px-4 py-2.5 outline-none focus:border-primary bg-gray-100" /></label>
          <label className="space-y-2"><span className="text-sm font-semibold">Number of employees *</span><select value={form.employeeCountRange} onChange={(ev) => { const nextValue = ev.target.value; setForm((p) => ({ ...p, employeeCountRange: nextValue })); if (EMPLOYEE_COUNT_OPTIONS.includes(nextValue as (typeof EMPLOYEE_COUNT_OPTIONS)[number])) { setFieldErrors((prev) => { const { employeeCountRange, ...rest } = prev; return rest; }); } }} className={selectClass(fieldErrors.employeeCountRange)}>{EMPLOYEE_COUNT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}</select></label>
          <label className="space-y-2"><span className="text-sm font-semibold">Industry</span><select value={form.industry} onChange={(ev) => setForm((p) => ({ ...p, industry: ev.target.value }))} className="select min-h-12 w-full rounded-lg border border-foreground/20 bg-background px-4 py-2.5"><option value="">Select industry (optional)</option>{INDUSTRY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}</select></label>
          <label className="space-y-2"><span className="text-sm font-semibold">SSM number *</span><input placeholder="e.g. 200701012345" value={form.ssmNumber} onChange={(ev) => setForm((p) => ({ ...p, ssmNumber: ev.target.value }))} className={inputClass(fieldErrors.ssmNumber)} /></label>
          <label className="space-y-2"><span className="text-sm font-semibold">Tax ID *</span><input placeholder="e.g. C1234567890" value={form.taxId} onChange={(ev) => setForm((p) => ({ ...p, taxId: ev.target.value }))} className={inputClass(fieldErrors.taxId)} /></label>
          <label className="space-y-2"><span className="text-sm font-semibold">Registration type</span><select value={form.businessRegistrationType} onChange={(ev) => setForm((p) => ({ ...p, businessRegistrationType: ev.target.value }))} className="select min-h-12 w-full rounded-lg border border-foreground/20 bg-background px-4 py-2.5">{BUSINESS_REGISTRATION_TYPE_OPTIONS.map((o) => <option key={o.value || "empty"} value={o.value}>{o.label}</option>)}</select></label>
        </div>}
        {step === 2 && <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2"><span className="text-sm font-semibold">Company address *</span><textarea placeholder="Street, building, unit number" rows={3} value={form.address} onChange={(ev) => setForm((p) => ({ ...p, address: ev.target.value }))} className={inputClass(fieldErrors.address)} /></label>
          <label className="space-y-2"><span className="text-sm font-semibold">State *</span><select value={form.state} onChange={(ev) => setForm((p) => ({ ...p, state: ev.target.value }))} className={selectClass(fieldErrors.state)}><option value="">Select state</option>{MALAYSIA_STATE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}</select></label>
          <label className="space-y-2"><span className="text-sm font-semibold">Postcode *</span><input placeholder="e.g. 50200" value={form.postcode} onChange={(ev) => setForm((p) => ({ ...p, postcode: ev.target.value }))} className={inputClass(fieldErrors.postcode)} /></label>
          <label className="space-y-2 md:col-span-1"><span className="text-sm font-semibold">City *</span><input placeholder="e.g. Kuala Lumpur" value={form.city} onChange={(ev) => setForm((p) => ({ ...p, city: ev.target.value }))} className={inputClass(fieldErrors.city)} /></label>
          <label className="space-y-2 md:col-span-1"><span className="text-sm font-semibold">Country *</span><select value={form.country} onChange={(ev) => setForm((p) => ({ ...p, country: ev.target.value }))} className={selectClass(fieldErrors.country)}>{COUNTRY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}</select></label>
          <label className="space-y-2"><span className="text-sm font-semibold">Company email</span><input placeholder="hello@company.com" type="email" value={form.email} onChange={(ev) => setForm((p) => ({ ...p, email: ev.target.value }))} className={inputClass(fieldErrors.email)} /></label>
          <label className="space-y-2"><span className="text-sm font-semibold">Website URL</span><input placeholder="https://company.com" type="url" value={form.websiteUrl} onChange={(ev) => setForm((p) => ({ ...p, websiteUrl: ev.target.value }))} className={inputClass(fieldErrors.websiteUrl)} /></label>
          <label className="space-y-2 md:col-span-2"><span className="text-sm font-semibold">Company phone</span><input placeholder="+60 12-345 6789" value={form.phone} onChange={(ev) => setForm((p) => ({ ...p, phone: ev.target.value }))} className="w-full rounded-lg border border-foreground/20 bg-transparent px-4 py-2.5" /></label>
        </div>}
        {step === 3 && <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="space-y-2"><span className="text-sm font-semibold">First name *</span><input placeholder="e.g. Syafiq" value={form.adminFirstName} onChange={(ev) => setForm((p) => ({ ...p, adminFirstName: ev.target.value }))} className={inputClass(fieldErrors.adminFirstName)} /></label>
            <label className="space-y-2"><span className="text-sm font-semibold">Last name</span><input placeholder="e.g. Abdullah" value={form.adminLastName} onChange={(ev) => setForm((p) => ({ ...p, adminLastName: ev.target.value }))} className="w-full rounded-lg border border-foreground/20 bg-transparent px-4 py-2.5" /></label>
            <label className="space-y-2"><span className="text-sm font-semibold">Admin email *</span><input placeholder="admin@company.com" type="email" value={form.adminEmail} onChange={(ev) => setForm((p) => ({ ...p, adminEmail: ev.target.value }))} className={inputClass(fieldErrors.adminEmail)} /></label>
            <label className="space-y-2"><span className="text-sm font-semibold">Admin phone</span><input placeholder="+60 12-345 6789" value={form.adminPhone} onChange={(ev) => setForm((p) => ({ ...p, adminPhone: ev.target.value }))} className="w-full rounded-lg border border-foreground/20 bg-transparent px-4 py-2.5" /></label>
            <label className="space-y-2">
              <span className="text-sm font-semibold">Admin password *</span>
              <div className="relative">
                <input placeholder="Minimum 6 characters" type={showPasswords ? "text" : "password"} value={form.adminPassword} onChange={(ev) => setForm((p) => ({ ...p, adminPassword: ev.target.value }))} className={`${inputClass(fieldErrors.adminPassword)} pr-16`} />
                <button type="button" onClick={() => setShowPasswords((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-primary hover:text-primary-accent">
                  {showPasswords ? "Hide" : "Show"}
                </button>
              </div>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold">Confirm admin password *</span>
              <div className="relative">
                <input placeholder="Re-enter password" type={showPasswords ? "text" : "password"} value={form.adminPasswordConfirmation} onChange={(ev) => setForm((p) => ({ ...p, adminPasswordConfirmation: ev.target.value }))} className={`${inputClass(fieldErrors.adminPassword)} pr-16`} />
                <button type="button" onClick={() => setShowPasswords((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-primary hover:text-primary-accent">
                  {showPasswords ? "Hide" : "Show"}
                </button>
              </div>
            </label>
          </div>
          <label className="inline-flex items-start gap-2 text-sm text-foreground-accent"><input type="checkbox" checked={form.agreeTerms} onChange={(ev) => setForm((p) => ({ ...p, agreeTerms: ev.target.checked }))} className="checkbox checkbox-sm checkbox-primary mt-0.5" /><span>I agree to the <button type="button" className="font-semibold underline" onClick={() => setPolicyModal("terms")}>Terms of Service</button> and <button type="button" className="font-semibold underline" onClick={() => setPolicyModal("privacy")}>Privacy Policy</button>.</span></label>
          <input type="text" value={form.websiteTrap} onChange={(ev) => setForm((p) => ({ ...p, websiteTrap: ev.target.value }))} className="hidden" tabIndex={-1} autoComplete="off" name="website" />
        </div>}
        <div className="flex items-center justify-between gap-3 border-t border-foreground/10 pt-6">
          <button type="button" className="btn group" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-x-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15 6-6 6 6 6" />
            </svg>
            <span>Back</span>
          </button>
          {step < 3 ? (
            <button type="button" className="btn btn-primary group text-black" onClick={nextStep}>
              <span>Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
              </svg>
            </button>
          ) : (
            <button type="submit" disabled={submitting} className="btn btn-primary group text-black">
              <span>{submitting ? "Provisioning..." : "Create Company Workspace"}</span>
              {!submitting && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
                </svg>
              )}
            </button>
          )}
        </div>
      </form>
      {policyModal && <dialog open className="modal modal-open"><div className="modal-box max-w-2xl"><h3 className="text-lg font-semibold">{policyModal === "terms" ? "Terms of Service" : "Privacy Policy"}</h3><div className="mt-4 text-sm text-foreground-accent">{policyModal === "terms" ? "By creating a workspace, you confirm your company is authorized to use this service." : "We process submitted company/admin data for provisioning, security, and support."}</div><div className="modal-action"><button type="button" className="btn btn-primary" onClick={() => setPolicyModal(null)}>Close</button></div></div><form method="dialog" className="modal-backdrop"><button type="button" onClick={() => setPolicyModal(null)}>close</button></form></dialog>}
      {successModalOpen && <dialog open className="modal modal-open"><div className="modal-box max-w-lg"><h3 className="text-lg font-semibold">Workspace created successfully</h3><p className="mt-3 text-sm text-foreground-accent">Your company workspace is ready. Continue to <span className="font-semibold text-foreground">{adminPortalUrl}</span> and sign in with the admin account you just created.</p><div className="modal-action"><button type="button" className="btn" onClick={() => setSuccessModalOpen(false)}>Close</button><button type="button" className="btn btn-primary text-black" onClick={() => { if (typeof window !== "undefined") window.location.href = adminPortalUrl; }}>Proceed</button></div></div><form method="dialog" className="modal-backdrop"><button type="button" onClick={() => setSuccessModalOpen(false)}>close</button></form></dialog>}
    </div></div></section>
  );
};

export default CompanySignUpPage;
