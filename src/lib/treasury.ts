import type { Locale } from "@/lib/i18n";
import type { ProofDoc } from "@/components/protected-doc";

// A published proof document. Source images are watermarked, redacted, stripped
// of metadata and downscaled, then sliced into tiles under /public/proofs/<id>/.
// See scratchpad/process_proofs.py for the pipeline that generates them.
export type AssetDocument = {
  doc: ProofDoc;
  caption: Record<Locale, string>;
  meta?: string;
};

// A single asset in the public treasury.
// `photoDoc` is the asset's own photo, served through the same tiled/watermarked
// pipeline as the documents. It stays null until a photo is published; the UI
// renders an honest placeholder for every null.
export type TreasuryAsset = {
  id: string;
  name: Record<Locale, string>;
  kind: Record<Locale, string>;
  status: "owned" | "pending";
  serialNumber: string | null;
  purchaseDate: Record<Locale, string> | null;
  // Per-locale because the price carries both currencies and their number
  // formats differ: "172 020,79 SGD (~$133 000)" vs "172,020.79 SGD (~$133,000)".
  // Both must always appear — "172k" is heard as dollars, and these are Singapore ones.
  purchasePrice: Record<Locale, string> | null;
  currentValue: string | null;
  vendor: string | null;
  photoDoc: AssetDocument | null;
  documents: AssetDocument[];
};

// Nothing is bought yet. The only entry is the planned first purchase, shown
// with every field empty so the page says plainly what does not exist.
export const TREASURY_ASSETS: TreasuryAsset[] = [
  {
    id: "planned-gold-1kg",
    name: {
      ru: "Золото, 1 кг (план)",
      en: "Gold, 1 kg (planned)",
    },
    kind: {
      ru: "Драгоценный металл · ещё не куплен",
      en: "Precious metal · not bought yet",
    },
    status: "pending",
    serialNumber: null,
    purchaseDate: null,
    purchasePrice: null,
    currentValue: null,
    vendor: null,
    photoDoc: null,
    documents: [],
  },
];
