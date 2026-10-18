import fs from "node:fs";
import path from "node:path";

function shipped(filename: string) {
  const abs = path.join(process.cwd(), "public", "images", filename);
  return fs.existsSync(abs) ? `/images/${filename}` : null;
}

/** Branded files win when they are in public/images. Scraped photos are the fallback. */
export function heroImage() {
  return shipped("hero-highway-branded.png") ?? "/images/hero-truck.jpg";
}

/** Product UI for the homepage hero. Highway art stays a texture, not the hero. */
export function dashboardImage() {
  return shipped("dashboard-hero.png") ?? heroImage();
}

export function receiptImage() {
  return shipped("receipt-cab.png") ?? shipped("feature-receipt-scan.png") ?? "/images/receipt-scan.jpg";
}

export function logoImage() {
  return shipped("haulbooks-logo.png") ?? "/images/logo.png";
}

export function shareImage() {
  return shipped("og-share.png");
}
