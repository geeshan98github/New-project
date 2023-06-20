function between(text, start, end, after) {

    if (after) {
        // if after exists, get the text after the after text
        const afterAt = text.indexOf(after);
        if (afterAt === -1) return '';
        text = text.slice(afterAt + after.length);
    }

    let startAt = text.indexOf(start);
    if (startAt === -1) return '';

    startAt += start.length;
    const endAt = text.indexOf(end, startAt);
    if (endAt === -1) return '';

    return text.slice(startAt, endAt);
}

function toCamelCase(str) {
    return str.toString() && str.split(' ').map((word, index) => {
        return (word[0]?.toUpperCase() || '') + (word.slice(1).toLowerCase() || '');
    }).join('');
}

function ProvinceMap(value) {

    const map = [{
        label: 'Ontario', value: 'ON',
    }, {
        label: 'Alberta', value: 'AB',
    }, {
        label: 'British Columbia', value: 'BC',
    }, {
        label: 'Manitoba', value: 'MB',
    }, {
        label: 'New Brunswick', value: 'NB',
    }, {
        label: 'Newfoundland', value: 'NL',
    }, {
        label: 'Northwest Territory', value: 'NT',
    }, {
        label: 'Nova Scotia', value: 'NS',
    }, {
        label: 'Prince Edward Island', value: 'PE',
    }, {
        label: 'Quebec', value: 'QC',
    }, {
        label: 'Saskatchewan', value: 'SK',
    }, {
        label: 'Yukon', value: 'YT',
    }, {
        label: 'Schomberg', value: 'SC',
    }];

    return map.find((item) => item.value === value)?.label || '';
}


async function CityMap(value) {

    const cities = [{
        CityName: 'Acton',
    }, {
        CityName: 'Ajax',
    }];

    for (const city of cities) {
        let name = city?.CityName?.replace(/\s+/g, '').toUpperCase();
        let value1 = value?.replace(/\s+/g, '').toUpperCase();
        if (name === value1) {
            return city.CityName;
        }
    }
}

async function getScanData(scanData) {
    let cleanedScanData = scanData.replace(/[\n\r]/g, '').replace(/\s+/g, '');

    let firstName = between(cleanedScanData, 'DAC', 'DAD');
    firstName = toCamelCase(firstName);

    let lastName = between(cleanedScanData, 'DCS', 'DAC');
    lastName = toCamelCase(lastName);

    const dob = cleanedScanData ? new Date(cleanedScanData.match(/(?<=DBB)(.*)(?=DB)/g)?.[0]?.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') || '') : undefined;

    const issueDate = cleanedScanData && new Date(cleanedScanData.match(/(?<=DBD)(.*)(?=DBB)/g)?.[0]?.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') || '');

    const address = between(cleanedScanData, 'DAG', 'DAI');
    const city = await CityMap(between(cleanedScanData, 'DAI', 'DAJ'));
    const province = ProvinceMap(between(cleanedScanData, 'DAJ', 'DAK'));
    const postalCode = between(cleanedScanData, 'DAK', 'DAQ');
    const licenseNumber = between(cleanedScanData, 'DAQ', 'DC');
    const expireDate = cleanedScanData ? new Date(cleanedScanData.match(/(?<=DBA)(.*)(?=DCS)/g)?.[0]?.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') || '') : undefined;
    const height = between(cleanedScanData, 'DAU', 'DAG');
    const gender = between(cleanedScanData, 'DC', 'HL', 'DAQ');
    return {
        firstName,
        lastName,
        licenseNumber,
        dob,
        issueDate,
        expireDate,
        height,
        address,
        city,
        province,
        postalCode,
        gender,
    };
}

async function Test() {

//     const res = await getScanData(`
// @
// ANSI
// 636012090002DL00410217ZO02580062DLDCAGDCBDCDDBA20270717DCSMANIVANNANDACVANATHY
// DADDBD20220826DBB19820717DBC2DAYUNKDAU164 cmDAG6 ATTMAR
// DRDAIBRAMPTONDAJONDAKL6P2R4
// DAQM04337620825717DCFHL6792789DCGCANDDENDDFNDDGNDCK*6264954*
// ZOZOAMANIVANNAN,VANATHYZOBYZOCZODZOEZOZM0433-76208-25717
//     `);

    const res = await getScanData(`
@
ANSI 636012090002DL00410225ZO02660065DLDCAG2
DCB DCD DBA20250709 DCSBALACHANDRAN DACBANUSHAN DAD DBD20220916 DBB19880610 DBC1 DAYUNK DAU185 cm
DAG11 SILVERDALE RD
DAIMARKHAM
DAJON DAKL6B0N7 DAQB02300720880610 DCFHN0224277 DCGCAN DDEN DDFN
DDGN
DCK*6613165* ZOZOABALACHANDRAN,BANUSHAN ZOBN ZOC ZOD ZOE ZOZB0230-07208-80610
    `);

    console.log(res);
}

Test();

