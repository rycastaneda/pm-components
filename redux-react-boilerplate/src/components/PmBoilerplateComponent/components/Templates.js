import React from 'react';
import PropTypes from 'prop-types';
import TemplateRow from './TemplateRow';
import { TemplatesWrapper } from '../styling/styledComponents';

const Templates = ({ templates }) => (
    <TemplatesWrapper>
        { templates.map((template) => {
            return (
                <TemplateRow key={template.id} template={template} />
            );
        })}
    </TemplatesWrapper>
);

Templates.propTypes = {
    templates: PropTypes.array.isRequired,
};

export default Templates;

