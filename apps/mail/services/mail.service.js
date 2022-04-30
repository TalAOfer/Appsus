import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const emailService = {
    query,
    changeReadStatus,
    removeEmailMethod,
    getEmailById,
    saveEmail,
    getUnreadMailsCount,
    changeStarStatus
}

const MAIL_KEY = 'emailDB'

const loggedinUser = {
    email: 'eran@appsus.com',
    fullname: 'Eran Avichzer'
}

const emails = [{
    //Sent
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: '',
    isStared: '',
    receivedAt: '',
    sentAt: 1551133930594,
    removeAt: '',
    from: loggedinUser.email,
    to: 'momo@momo.com',
},
{
    // Inbox
    id: 'e102',
    subject: 'Bank Leumi',
    body: 'The msg systems ag uses cookies to provide an optimal website experience that is tailored to your specific needs. These includes cookies. ',
    isRead: false,
    isStared: false,
    receivedAt: 1651064829019,
    sentAt: '',
    removeAt: '',
    from: 'hen@leumi.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e103',
    subject: 'Hey Eran',
    body: 'Leave me in your mother',
    isRead: true,
    isStared: false,
    receivedAt: 1651064829019,
    sentAt: '',
    removeAt: '',
    from: 'momo@momo.com',
    to: loggedinUser.email
},
{
    // Trash
    id: 'e104',
    subject: 'Fishing',
    body: 'Give your money!',
    isRead: true,
    isStared: false,
    receivedAt: 1651064829019,
    sentAt: '',
    removeAt: 1651064829019,
    from: 'money@gamil.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e105',
    subject: 'Job interview',
    body: 'Come to work with us at Google',
    isRead: true,
    isStared: true,
    receivedAt: 1651064829019,
    sentAt: '',
    removeAt: '',
    from: 'hr@gmail.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e106',
    subject: 'Stripe to support crypto payouts on Twitter ',
    body: 'Goldman Sachs said it is examining non-fungible tokens (NFTs) and particularly the "tokenization of real assets," as the investment bank dives deeper into the crypto space. The metaverse where real world assets like real estate are bought and sold as NFTs has been garnering the attention of big names in financial services and a range of other industries. We are actually exploring NFTs in the context of financial instruments, and actually there the power is actually quite powerful. So we work on a number of things," Mathew McDermott, global head of digital assets at Goldman Sachs, said at the Financial Times Crypto and Digital Assets Summit on Wednesday. The bank has dived into crypto.It started offering bitcoin derivatives to investors in 2021 and conducted its first over the counter crypto trade with the digital- asset financial company Galaxy Digital in March this year.',
    isRead: true,
    isStared: false,
    receivedAt: 1651064865019,
    sentAt: '',
    removeAt: '',
    from: 'do_not_reply@mailersp1.binance.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e107',
    subject: 'Danielle’s Apple ID was used to sign in to iCloud on a new device',
    body: 'Dear Eran Avichzer, Danielle’s Apple ID (daniellea2015@icloud.com) was used to sign in to iCloud on a new device. Date and Time: 23 April 2022, 18:27 UTC If the information above looks familiar, you can ignore this message. If you and Danielle do not recognise this device or believe someone may have accessed Danielle’s account, change the account password as soon as possible at https://appleid.apple.com. Sincerely, Apple Support',
    isRead: true,
    isStared: false,
    receivedAt: 1651064865019,
    sentAt: '',
    removeAt: '',
    from: 'noreply@email.apple.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e108',
    subject: 'TalAOfer invited you to TalAOfer/Appsus',
    body: 'You can accept or decline this invitation. You can also head over to https://github.com/TalAOfer/Appsus to check out the repository or visit @TalAOfer to learn a bit more about them. This invitation will expire in 7 days.',
    isRead: false,
    isStared: false,
    receivedAt: 1651055555019,
    sentAt: '',
    removeAt: '',
    from: 'noreply@github.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e109',
    subject: 'Good news regarding order 8149069784480979',
    body: 'Hi Eran Avichzer, Order 8149069784480979 has been shipped! You can click below to track your package, check delivery status or see more details. (Note: It may take up to 24 hours to see tracking information.)',
    isRead: false,
    isStared: false,
    receivedAt: 1651055554444,
    sentAt: '',
    removeAt: '',
    from: 'transaction@notice.aliexpress.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e110',
    subject: '1 new jobs for full stack',
    body: 'Full-Stack Software Engineer Minimum qualifications: Bachelors degree in Computer Science or related technical field, or equivalent practical experience. Experience in software development. Preferred qualifications: Experience with one or more general purpose programming languages including but not limited to: Java, C/C++, C#, Objective C, Python, JavaScript, or Go. Experience with server-side web frameworks such as Ruby-on-Rails, or Django. Significant development experience in Angular, ember.js, backbone.js or similar. Strong knowledge of Web standards and protocols, including JavaScript, HTML, CSS and HTTP. Knowledge in the area of graphics.',
    isRead: false,
    isStared: false,
    receivedAt: 1651888522000,
    sentAt: '',
    removeAt: '',
    from: 'jobalerts-noreply@linkedin.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e111',
    subject: 'Confirm your email address',
    body: 'Verify your e-mail to finish signing up for Avocode',
    isRead: false,
    isStared: false,
    receivedAt: 1651055555019,
    sentAt: '',
    removeAt: '',
    from: 'hello@avocode.com',
    to: loggedinUser.email
}

]

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}

_createEmails()

function query(status, searchByTxt) {
    let emails = _loadFromStorage()
    let emailFilterd = []
    let emailFilterdWithSearch = []
    searchByTxt = searchByTxt.toLowerCase()

    for (const email in emails) {
        let currEmail = emails[email]
        if (status === 'inbox') { if (currEmail.receivedAt && !currEmail.removeAt) emailFilterd.push(currEmail) }
        else if (status === 'starred') {
            if (!currEmail.isStared) continue
            emailFilterd.push(currEmail)
        }
        else if (status === 'sent') { if (currEmail.sentAt && !currEmail.removeAt) emailFilterd.push(currEmail) }
        else if (status === 'trash') { if (currEmail.removeAt) emailFilterd.push(currEmail) }
        else if (status === 'draft') { if (currEmail.receivedAt && !currEmail.removeAt) emailFilterd.push(currEmail) }
    }
    for (const email in emailFilterd) {
        let currEmail = emailFilterd[email]
        if (currEmail.body.toLowerCase().includes(searchByTxt) || currEmail.subject.toLowerCase().includes(searchByTxt) ||
            currEmail.from.toLowerCase().includes(searchByTxt) || currEmail.to.toLowerCase().includes(searchByTxt)) {
            emailFilterdWithSearch.push(currEmail)
        }
    }

    return Promise.resolve(emailFilterdWithSearch)
}

function _createEmails() {
    const emailsDB = _loadFromStorage()
    if (!emailsDB || !emailsDB.length) {
        const emailsDB = emails
        _saveToStorage(emailsDB)
    }
}

function _createEmail(email) {
    return {
        id: !email.id && utilService.makeId(),
        subject: email.subject,
        body: email.body,
        isRead: email.isRead,
        isStared: false,
        receivedAt: '',
        sentAt: Date.now(),
        to: email.to,

        from: loggedinUser.email,
        fromName: loggedinUser.fullname,
    }
}

function _saveToStorage(emails) {
    storageService.saveToStorage(MAIL_KEY, emails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(MAIL_KEY)
}

function changeReadStatus(isRead, emailId) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === emailId)
    emails[emailIdx].isRead = isRead
    _saveToStorage(emails)
    return Promise.resolve()
}

function changeStarStatus(isStared, emailId) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === emailId)
    emails[emailIdx].isStared = isStared
    _saveToStorage(emails)
    return Promise.resolve()
}

function removeEmailMethod(emailId) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === emailId)

    if (emails[emailIdx].removeAt) emails.splice(emailIdx, 1)
    else emails[emailIdx].removeAt = Date.now()

    _saveToStorage(emails)
    return Promise.resolve()
}

function getEmailById(emailId) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === emailId)
    return Promise.resolve(emails[emailIdx])
}

function saveEmail(email) {
    let emails = _loadFromStorage()
    let creaetEmail;
    creaetEmail = _createEmail(email)
    emails.push(creaetEmail)

    _saveToStorage(emails)
    return Promise.resolve(creaetEmail.id)
}

function getUnreadMailsCount() {
    let emails = _loadFromStorage()
    let count = 0
    emails.map((email) => {
        if (email.isRead === false) count++
    })
    return Promise.resolve(count / emails.length)
}