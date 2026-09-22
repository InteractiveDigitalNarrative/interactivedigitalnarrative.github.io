// Allowed profile values — must match docs/platform/data-contract.md.
// Age + gender ids and labels match Storm Alert's survey (Demography.jsx, en.json).
export const AGE_OPTIONS = [
  ['under_18', 'Under 18'],
  ['18_24', '18 – 24'],
  ['25_34', '25 – 34'],
  ['35_44', '35 – 44'],
  ['45_54', '45 – 54'],
  ['55_64', '55 – 64'],
  ['65_plus', '65 +'],
]

export const GENDER_OPTIONS = [
  ['male', 'Male'],
  ['female', 'Female'],
  ['non_binary', 'Non-binary'],
  ['prefer_not_say', 'Prefer not to say'],
]

export const LANGUAGE_OPTIONS = [
  ['en', 'English'],
  ['et', 'Eesti'],
]

// ISO 3166-1 alpha-2; names come from the browser (Intl.DisplayNames)
const ISO_CODES =
  'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(
    ' ',
  )

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

// Estonia first (the pilot audience), then A–Z
export const COUNTRY_OPTIONS = ISO_CODES.map((c) => [c, regionNames.of(c)]).sort((a, b) =>
  a[0] === 'EE' ? -1 : b[0] === 'EE' ? 1 : a[1].localeCompare(b[1]),
)

const allowed = {
  age: new Set(AGE_OPTIONS.map(([v]) => v)),
  gender: new Set(GENDER_OPTIONS.map(([v]) => v)),
  language: new Set(LANGUAGE_OPTIONS.map(([v]) => v)),
  country: new Set([...ISO_CODES, 'prefer_not_say']),
}

// Keep only valid fields; a missing field means "ask in the game as usual"
export function cleanProfile(raw) {
  if (!raw || typeof raw !== 'object') return null
  const out = {}
  const nickname = typeof raw.nickname === 'string' ? raw.nickname.trim().slice(0, 30) : ''
  if (nickname) out.nickname = nickname
  for (const key of ['age', 'gender', 'language', 'country']) {
    if (allowed[key].has(raw[key])) out[key] = raw[key]
  }
  if (typeof raw.updatedAt === 'string') out.updatedAt = raw.updatedAt
  return out
}
