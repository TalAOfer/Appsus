import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const emailService = {
    query,
    changeReadStatus,
    removeEmailMethod

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

function query(status) {
    let emails = _loadFromStorage()
    let emailFilterd = []
    if (status === 'inbox') {
        for (const email in emails) {
            if (emails[email].receivedAt && !emails[email].removeAt) emailFilterd.push(emails[email])
        }
    }
    else if (status === 'starred') {
        for (const email in emails) {
            if (!emails[email].isStared) continue
            emailFilterd.push(emails[email])
        }
    }
    else if (status === 'sent') {
        for (const email in emails) {
            if (emails[email].sentAt && !emails[email].removeAt) emailFilterd.push(emails[email])
        }
    }
    // else if (status === 'draft') {
    //     for (const email in emails) {
    //         if (emails[email].receivedAt && !emails[email].removeAt) emailFilterd.push(emails[email])
    //     }
    // }
    else if (status === 'trash') {
        for (const email in emails) {
            if (emails[email].removeAt) emailFilterd.push(emails[email])
        }
    }

    return Promise.resolve(emailFilterd)
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
        id: utilService.makeId(),
        subject: email.subject,
        body: email.body,
        isRead: email.isRead,
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

function removeEmailMethod(emailId) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === emailId)

    if (emails[emailIdx].removeAt) emails.splice(emailIdx, 1)
    else emails[emailIdx].removeAt = Date.now()
    
    _saveToStorage(emails)
    return Promise.resolve()
}