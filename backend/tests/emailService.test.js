import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMailMock = vi.fn();

vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({ sendMail: sendMailMock })),
  },
}));

import EmailService from "../src/services/emailService.js";

describe("emailService", () => {
  let originalEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    vi.clearAllMocks();
    sendMailMock.mockReset();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("deve retornar skipped= true com reason=mail_disabled quando NODE_ENV=test", async () => {
    vi.restoreAllMocks();
    process.env.NODE_ENV = "test";

    const res = await EmailService.enviarEmail({
      to: "a@b.com",
      subject: "s",
      text: "t",
    });

    expect(res).toEqual({
      sent: false,
      skipped: true,
      reason: "mail_disabled",
    });
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("deve retornar skipped= true com reason=missing_recipient quando to faltar", async () => {
    process.env.NODE_ENV = "development";
    process.env.MAIL_HOST = "smtp.local";
    process.env.MAIL_PORT = "587";

    const res = await EmailService.enviarEmail({
      to: "",
      subject: "s",
      text: "t",
    });

    expect(res).toEqual({
      sent: false,
      skipped: true,
      reason: "missing_recipient",
    });
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("deve retornar skipped=true quando MAIL_HOST não configurado", async () => {
    process.env.NODE_ENV = "development";
    delete process.env.MAIL_HOST;

    const res = await EmailService.enviarEmail({
      to: "a@b.com",
      subject: "s",
      text: "t",
    });

    // no código: se !config ou mail disabled ou !to => mail_disabled (por causa do reason lógica)
    expect(res).toEqual({
      sent: false,
      skipped: true,
      reason: "mail_disabled",
    });
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("deve enviar email quando configurado e to presente", async () => {
    process.env.NODE_ENV = "development";
    process.env.MAIL_HOST = "smtp.local";
    process.env.MAIL_PORT = "587";
    process.env.MAIL_USER = "u";
    process.env.MAIL_PASS = "p";
    process.env.MAIL_FROM = "From <from@local>";
    process.env.MAIL_SECURE = "false";

    sendMailMock.mockResolvedValue({});

    const res = await EmailService.enviarEmail({
      to: "a@b.com",
      subject: "assunto",
      text: "texto",
      html: "<b>ok</b>",
    });

    expect(res).toEqual({ sent: true, skipped: false });
    expect(sendMailMock).toHaveBeenCalledWith({
      from: "From <from@local>",
      to: "a@b.com",
      subject: "assunto",
      text: "texto",
      html: "<b>ok</b>",
    });
  });
});
