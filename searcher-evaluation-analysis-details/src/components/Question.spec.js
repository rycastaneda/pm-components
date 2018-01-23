import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Question from './Question';
import Comment from './Comment';
import Score from './Score';

const setup = props => {
    const component = shallow(<Question {...props} />);

    return { component };
};

describe('Question component: ', () => {
    const props = {
        number: 1,
        questionTitle: 'Test Question',
        totalScore: 5,
        scale: 5,
        staffAssignee: 'Troy Redden',
        staffAssigneeId: 1,
        comments: [
            {
                id: 1,
                staffId: 1,
                staff: 'Reese',
                comment: 'Company size is too small, still considering',
                score: 5,
                uploads: []
            },
            {
                id: 2,
                staffId: 3,
                staff: 'Kitkat',
                comment: 'Agree with comment above',
                score: 5,
                uploads: [
                    {
                        id: '330280',
                        title: 'Pasted image at 2018_01_18 12_39 PM.png',
                        original_name:
                            'Pasted image at 2018_01_18 12_39 PM.png',
                        hash: 'Boe8JouiZQXaJqR91175236151',
                        created_on: '2018-01-19 01:35:11',
                        filetype: 'png',
                        filesize: 103280,
                        path: 'documents/Boe8JouiZQXaJqR91175236151',
                        download_url:
                            'https://s3.ap-southeast-2.amazonaws.com/upload.staging.plantminer.com.au/documents/Boe8JouiZQXaJqR91175236151?response-content-disposition=attachment%3B%20filename%3D%22Pasted%20image%20at%202018_01_18%2012_39%20PM.png%22&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJIU6BIH6USLHNP2Q%2F20180119%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20180119T031434Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=74e419f364e4cae6fb3f85f21075c5c358c73c7798649057b4974eb9ffdbeca5'
                    }
                ]
            }
        ]
    };

    it('should render the Question with title, score, comments', () => {
        const { component } = setup(props);

        expect(component.find('.question-title').text()).to.eql(
            props.questionTitle
        );
        expect(component.find(Score)).to.have.length(1);
        expect(component.find('.fa-chevron-right'));
        expect(component.find(Comment)).to.have.length(0);
    });

    it('should render the Question without score', () => {
        const { component } = setup({
            ...props,
            scale: 1,
            totalScore: null
        });

        expect(component.find('.question-title').text()).to.eql(
            props.questionTitle
        );
        expect(component.find(Score)).to.have.length(0);
        expect(component.find('.fa-chevron-right'));
        expect(component.find(Comment)).to.have.length(0);
    });

    it('should be able to expand to show comments', () => {
        const { component } = setup(props);

        component.find('.toggle-comments').simulate('click');
        expect(component.find('.fa-chevron-down'));
        expect(component.find(Comment)).to.have.length(props.comments.length);
    });
});
