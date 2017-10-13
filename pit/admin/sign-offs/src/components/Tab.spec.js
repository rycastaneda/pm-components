import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Tab from './Tab';
import Loader from './Loader';
import NewComment from './NewComment';
import Question from './Question';
import Comment from './Comment';
import mockSections from '../mocks/sections.json';

const setup = (props) => {
    const component = mount(
        <Tab {...props} />
    );

    return { component };
};

const comments = mockSections.included
    .filter(include => include.type === 'comment')
    .map((include) => {
        return {
            ...include.attributes,
            staffId: include.relationships.staff.id,
            staff: 'Tester',
            isEditing: false,
            isLoading: false
        };
    });

const questions = mockSections.included
    .filter(include => include.type === 'question')
    .map((include) => {
        return {
            ...include.attributes,
            answer: 'dummy answer'
        };
    });

const toggleCommentEdit = () => sinon.spy();
const deleteComment = () => sinon.spy();
const submitComment = () => sinon.spy();
const getNewCommentRef = sinon.spy();
const isReadOnly = false;
const currentStaffId = 100;

describe('Tab component: ', () => {


    it('should render the current tab: questions, with Question components rendered', () => {
        
        const { component } = setup({ 
            currentTab: 'questions',
            comments,
            questions,
            toggleCommentEdit,
            deleteComment,
            getNewCommentRef, 
            submitComment,
            isReadOnly,
            currentStaffId
        });

        expect(component.find(Question)).to.have.length(questions.length);
    });

    it('should render the current tab: comments, with Comment components rendered', () => {
        const { component } = setup({ 
            currentTab: 'comments',
            comments,
            questions,
            toggleCommentEdit,
            deleteComment,
            getNewCommentRef, 
            submitComment,
            isReadOnly,
            currentStaffId
        });

        expect(component.find(Comment)).to.have.length(comments.length);
    });

    it('should render Loader in the Comment components rendered', () => {
        const commentsLoading = comments.map((comment) => {
            comment.isLoading = true;
            return comment;
        });

        const { component } = setup({ 
            currentTab: 'comments',
            comments: commentsLoading,
            questions,
            toggleCommentEdit,
            deleteComment,
            getNewCommentRef, 
            submitComment,
            isReadOnly,
            currentStaffId
        });

        expect(component.find(Comment)).to.have.length(comments.length);
        expect(component.find(Loader)).to.have.length(commentsLoading.length);
    });

    it('should render NewCommentForm in the Comment components rendered', () => {
        const commentsInEdit = comments.map((comment) => {
            comment.isEditing = true;
            return comment;
        });

        const { component } = setup({ 
            currentTab: 'comments',
            comments: commentsInEdit,
            questions,
            toggleCommentEdit,
            deleteComment,
            getNewCommentRef, 
            submitComment,
            isReadOnly,
            currentStaffId
        });

        expect(component.find(Comment)).to.have.length(0);
        expect(component.find(NewComment)).to.have.length(commentsInEdit.length);
    });

});