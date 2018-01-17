import UrlAssembler from 'url-assembler';

export const assembleIdLinkUrl = (id, type) => {
    const rfqUrl = UrlAssembler().template(
        '/searcher/quotes/quote_details/:quote'
    );
    const evaluationUrl = UrlAssembler().template(
        '/searcher/evaluation_assignments/analyse/:evaluation'
    );
    const engagementUrl = UrlAssembler().template(
        '/searcher/reports/engagement_details/:engagement'
    );
    const messagesUrl = UrlAssembler().template('/searcher/messages');

    switch (type) {
        case 'RFQ':
            return rfqUrl.param('quote', id).toString();

        case 'Evaluation':
            return evaluationUrl.param('evaluation', id).toString();

        case 'Engagement':
            return engagementUrl.param('engagement', id).toString();

        default:
            return messagesUrl.toString();
    }
};