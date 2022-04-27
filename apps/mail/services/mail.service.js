import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const emailService = {
    query
}

const MAIL_KEY = 'emailDB'

const email = {
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    to: 'momo@momo.com'
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}

_createEmails()

function query(/*filter*/) {
    let emails = _loadFromStorage()
    // if (filter) {
    //     let { name, priceFrom, priceTo } = filter
    //     if (!priceFrom) priceFrom = 0
    //     if (!priceTo) priceTo = Infinity

    //     books = books.filter(book =>
    //         book.title.toLowerCase().includes(name) &&
    //         book.listPrice.amount >= priceFrom &&
    //         book.listPrice.amount <= priceTo)
    // }
    return Promise.resolve(emails)
}

function _createEmails() {
    const emails = _loadFromStorage()
    if (!emails || !emails.length) {
        const emails = [_createEmail(email)]
        _saveToStorage(emails)
    }
}

function _createEmail(email) {
    return {
        id: utilService.makeId(),
        subject: email.subject,
        body: email.body,
        isRead: email.isRead,
        sentAt: Date.now(),
        to: email.to
    }
}

function _saveToStorage(emails) {
    storageService.saveToStorage(MAIL_KEY, emails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(MAIL_KEY)
}
