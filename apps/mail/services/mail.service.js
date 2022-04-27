import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const emailService = {
    query
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
    subject: 'Hey Eran',
    body: 'Leave me in your mother',
    isRead: false,
    isStared: false,
    receivedAt: 1551133930594,
    sentAt: '',
    removeAt: '',
    from: 'momo@momo.com',
    to: loggedinUser.email
},
{
    // Trash
    id: 'e103',
    subject: 'Fishing',
    body: 'Give your money!',
    isRead: false,
    isStared: false,
    receivedAt: 1551133930594,
    sentAt: '',
    removeAt: 1551133930594,
    from: 'money@gamil.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e104',
    subject: 'Job interview',
    body: 'Come to work with us at Google',
    isRead: false,
    isStared: true,
    receivedAt: 1551133930594,
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
