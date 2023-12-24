import { createSlice } from "@reduxjs/toolkit";

const initialMails ={
    inboxMails : [],
    sentBoxMails : [],
    deleteBoxMails : [],
}

const MailSlice = createSlice({
    name: 'mails',
    initialState: initialMails,
    reducers : {
        addInboxMail (state,action){
            state.inboxMails.push(action.payload);
        },
        removeInboxMail (state,action){
            const updatedInbox = state.inboxMails.filter(
                i => i.id !== action.payload.id
            )
            state.inboxMails = updatedInbox;
        },
        addSentboxMail (state,action){
            state.sentBoxMails.push(action.payload);
        },
        removeSentboxMail (state,action){
            const updatedSentbox = state.sentBoxMails.filter(
                i => i.id !== action.payload.id
            );
            state.sentBoxMails = updatedSentbox;
        },
        updatedInboxMail (state,action){
            const mail = action.payload;
            const updatedMail = { ...mail,isRead : true};
            const mailIndex = state.inboxMails.findIndex((i)=> i.id === mail.id);
            const updatedMails = [...state.inboxMails];
            updatedMails[mailIndex] = updatedMail;
            state.inboxMails = updatedMails;
        },
        replaceInboxMail (state,action){
            state.inboxMails = action.payload;
        },
        replaceSentboxMail (state,action){
            state.sentBoxMails = action.payload;
        }
    }
})

export const mailActions = MailSlice.actions;

export default MailSlice;