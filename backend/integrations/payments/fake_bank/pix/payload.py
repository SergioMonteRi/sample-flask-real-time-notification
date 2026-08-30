from decimal import Decimal
from uuid import UUID


def _tlv(field_id: str, value: str) -> str:
    length = len(value)

    return f"{field_id}{length:02d}{value}"


def _crc16(payload: str) -> str:
    crc = 0xFFFF

    for byte in payload.encode("utf-8"):
        crc ^= byte << 8

        for _ in range(8):
            if crc & 0x8000:
                crc = (crc << 1) ^ 0x1021
            else:
                crc <<= 1

            crc &= 0xFFFF

    return f"{crc:04X}"


def generate_pix_payload(
    bank_payment_id: UUID,
    value: Decimal
) -> str:

    merchant_account_information = (
        _tlv("00", "BR.GOV.BCB.PIX")
        + _tlv("01", str(bank_payment_id))
    )

    payload = (
        _tlv("00", "01")
        + _tlv("26", merchant_account_information)
        + _tlv("52", "0000")
        + _tlv("53", "986")
        + _tlv("54", f"{value:.2f}")
        + _tlv("58", "BR")
        + _tlv("59", "FAKE BANK")
        + _tlv("60", "SAO PAULO")
        + _tlv("62", _tlv("05", str(bank_payment_id)))
    )

    payload += "6304"

    crc = _crc16(payload)

    return payload + crc