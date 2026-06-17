import nodemailer from "nodemailer";

const TRUE_VALUES = new Set(["1", "true", "yes", "sim"]);

function isTrue(value) {
  return TRUE_VALUES.has(String(value || "").trim().toLowerCase());
}

function isTestEnvironment() {
  return process.env.NODE_ENV === "test";
}

function mailIsDisabled() {
  return isTestEnvironment() || isTrue(process.env.MAIL_DISABLED);
}

function getMailConfig() {
  const host = process.env.MAIL_HOST;
  const port = Number(process.env.MAIL_PORT || 587);
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  const from = process.env.MAIL_FROM || "SpendSmart <no-reply@spendsmart.local>";

  if (!host) {
    return null;
  }

  return {
    host,
    port,
    secure: isTrue(process.env.MAIL_SECURE),
    auth: user || pass ? { user, pass } : undefined,
    from,
  };
}

class EmailService {
  static createTransporter(config) {
    return nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
    });
  }

  static async enviarEmail({ to, subject, text, html }) {
    const config = getMailConfig();

    if (mailIsDisabled() || !config || !to) {
      return {
        sent: false,
        skipped: true,
        reason: !to ? "missing_recipient" : "mail_disabled",
      };
    }

    const transporter = this.createTransporter(config);

    await transporter.sendMail({
      from: config.from,
      to,
      subject,
      text,
      html,
    });

    return { sent: true, skipped: false };
  }
}

export default EmailService;
