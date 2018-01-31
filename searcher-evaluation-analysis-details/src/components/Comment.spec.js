import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Comment from './Comment';
import UploadLists from './UploadLists';
import Score from './Score';

const setup = props => {
    const component = mount(<Comment {...props} />);

    return { component };
};

describe('Comment component: ', () => {
    const props = {
        staff: 'Reese',
        comment: 'Company size is too small, still considering',
        score: 1,
        scale: 10,
        staffAssignee: 'Troy Redden',
        staffAssigneeId: 1,
        uploads: [
            {
                id: '330280',
                title: 'Pasted image at 2018_01_18 12_39 PM.png',
                original_name: 'Pasted image at 2018_01_18 12_39 PM.png',
                hash: 'Boe8JouiZQXaJqR91175236151',
                created_on: '2018-01-19 01:35:11',
                filetype: 'png',
                filesize: 103280,
                path: 'documents/Boe8JouiZQXaJqR91175236151',
                download_url:
                    'https://s3.ap-southeast-2.amazonaws.com/upload.staging.plantminer.com.au/documents/Boe8JouiZQXaJqR91175236151?response-content-disposition=attachment%3B%20filename%3D%22Pasted%20image%20at%202018_01_18%2012_39%20PM.png%22&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJIU6BIH6USLHNP2Q%2F20180119%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20180119T031434Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=74e419f364e4cae6fb3f85f21075c5c358c73c7798649057b4974eb9ffdbeca5'
            }
        ]
    };
    const { component } = setup(props);

    it('should be able to render the Comment with props', () => {
        expect(component.find('.staff').text()).to.eql(props.staff);
        expect(component.find('.comment').text()).to.eql(props.comment);
        expect(component.find(Score)).to.have.length(1);
        expect(component.find(UploadLists)).to.have.length(
            props.uploads.length
        );
    });
});
