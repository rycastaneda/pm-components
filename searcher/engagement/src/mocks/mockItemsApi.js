import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const fromRequestedItemsAPI = {
    'data': [{
        'type': 'requested-items',
        'id': '60482',
        'attributes': {
            'title': '26 - 30 Tonne Excavator'
        },
        'relationships': {
            'pricingOptions': {
                'data': [{
                    'type': 'pricing-options',
                    'id': '1'
                }, {
                    'type': 'pricing-options',
                    'id': '2'
                }, {
                    'type': 'pricing-options',
                    'id': '3'
                }, {
                    'type': 'pricing-options',
                    'id': '4'
                }, {
                    'type': 'pricing-options',
                    'id': '9'
                }, {
                    'type': 'pricing-options',
                    'id': '10'
                }, {
                    'type': 'pricing-options',
                    'id': '11'
                }, {
                    'type': 'pricing-options',
                    'id': '12'
                }]
            },
            'quoteRequest': {
                'data': {
                    'type': 'quote-request',
                    'id': '27473'
                }
            },
            'matchedItems': {
                'data': [{
                    'type': 'matched-items',
                    'id': '3556022'
                }, {
                    'type': 'matched-items',
                    'id': '3556023'
                }, {
                    'type': 'matched-items',
                    'id': '3556024'
                }]
            }
        }
    }],
    'included': [{
        'type': 'supplier',
        'id': '469303',
        'attributes': {
            'title': 'Orange Hire (QLD)'
        }
    }, {
        'type': 'supplier',
        'id': '469304',
        'attributes': {
            'title': 'Delta Rent NSW/QLD'
        }
    }, {
        'type': 'engagements',
        'id': '1',
        'attributes': {
            'status': 1,
            'purchase-order': '1282',
            'purchase-value': 150,
            'pre-start-date': '2016-11-05'
        }
    }, {
        'type': 'supplier',
        'id': '469305',
        'attributes': {
            'title': 'Excedo Group Pty Ltd'
        }
    }, {
        'type': 'pricing-options',
        'id': '1',
        'attributes': {
            'title': 'Dry Hourly'
        }
    }, {
        'type': 'pricing-options',
        'id': '2',
        'attributes': {
            'title': 'Dry Daily'
        }
    }, {
        'type': 'pricing-options',
        'id': '3',
        'attributes': {
            'title': 'Dry Weekly'
        }
    }, {
        'type': 'pricing-options',
        'id': '4',
        'attributes': {
            'title': 'Dry Monthly'
        }
    }, {
        'type': 'pricing-options',
        'id': '9',
        'attributes': {
            'title': 'Mobilisation Total'
        }
    }, {
        'type': 'pricing-options',
        'id': '10',
        'attributes': {
            'title': 'Mobilisation per Km'
        }
    }, {
        'type': 'pricing-options',
        'id': '11',
        'attributes': {
            'title': 'Demobilisation Total'
        }
    }, {
        'type': 'pricing-options',
        'id': '12',
        'attributes': {
            'title': 'Demobilisation per Km'
        }
    }, {
        'type': 'quote-request',
        'id': '27473',
        'attributes': {
            'title': 'Test QR API'
        }
    }, {
        'type': 'matched-items',
        'id': '3556022',
        'attributes': {
            'quantity': 1,
            'title': '30 Tonne Excavator'
        },
        'relationships': {
            'matchedSupplier': {
                'data': [{
                    'type': 'supplier',
                    'id': '469303'
                }]
            },
            'quoteRequestEngagements': {
                'data': []
            }
        }
    }, {
        'type': 'matched-items',
        'id': '3556023',
        'attributes': {
            'quantity': 1,
            'title': '2008 Komatsu PC270-8  27 Tonne Excavator'
        },
        'relationships': {
            'matchedSupplier': {
                'data': [{
                    'type': 'supplier',
                    'id': '469304'
                }]
            },
            'quoteRequestEngagements': {
                'data': [{
                    'type': 'engagements',
                    'id': '1'
                }]
            }
        }
    }, {
        'type': 'matched-items',
        'id': '3556024',
        'attributes': {
            'quantity': 1,
            'title': 'Komatsu PC300-7 Excavator'
        },
        'relationships': {
            'matchedSupplier': {
                'data': [{
                    'type': 'supplier',
                    'id': '469305'
                }]
            },
            'quoteRequestEngagements': {
                'data': []
            }
        }
    }]
};

const fromMatchedItemAPI = {
    'data': {
        'type': 'matched-item',
        'id': '3556023',
        'attributes': {
            'quantity': 1,
            'title': '2008 Komatsu PC270-8  27 Tonne Excavator'
        },
        'relationships': {
            'matchedSupplier': {
                'data': [{
                    'type': 'supplier',
                    'id': '469304'
                }]
            },
            'quoteRequestEngagements': {
                'data': [{
                    'type': 'engagements',
                    'id': '1'
                }]
            },
            'pricingOptions': {
                'data': [{
                    'type': 'pricing-options',
                    'id': '1'
                }, {
                    'type': 'pricing-options',
                    'id': '2'
                }, {
                    'type': 'pricing-options',
                    'id': '3'
                }, {
                    'type': 'pricing-options',
                    'id': '4'
                }, {
                    'type': 'pricing-options',
                    'id': '9'
                }, {
                    'type': 'pricing-options',
                    'id': '10'
                }, {
                    'type': 'pricing-options',
                    'id': '11'
                }, {
                    'type': 'pricing-options',
                    'id': '12'
                }]
            }
        }
    },
    'included': [{
        'type': 'supplier',
        'id': '469304',
        'attributes': {
            'title': 'Delta Rent NSW/QLD'
        }
    }, {
        'type': 'engagements',
        'id': '1',
        'attributes': {
            'status': 1,
            'purchase-order': '1282',
            'purchase-value': 150,
            'pre-start-date': '2016-11-05'
        }
    }, {
        'type': 'pricing-options',
        'id': '1',
        'attributes': {
            'title': 'Dry Hourly',
            'value': 50,
            'standby_value': 255
        }
    }, {
        'type': 'pricing-options',
        'id': '2',
        'attributes': {
            'title': 'Dry Daily',
            'value': 1000,
            'standby_value': 1055
        }
    }, {
        'type': 'pricing-options',
        'id': '3',
        'attributes': {
            'title': 'Dry Weekly',
            'value': 4805,
            'standby_value': 4500
        }
    }, {
        'type': 'pricing-options',
        'id': '4',
        'attributes': {
            'title': 'Dry Monthly',
            'value': 12500,
            'standby_value': 11000
        }
    }, {
        'type': 'pricing-options',
        'id': '9',
        'attributes': {
            'title': 'Mobilisation Total',
            'value': null,
            'standby_value': null
        }
    }, {
        'type': 'pricing-options',
        'id': '10',
        'attributes': {
            'title': 'Mobilisation per Km',
            'value': null,
            'standby_value': null
        }
    }, {
        'type': 'pricing-options',
        'id': '11',
        'attributes': {
            'title': 'Demobilisation Total',
            'value': null,
            'standby_value': null
        }
    }, {
        'type': 'pricing-options',
        'id': '12',
        'attributes': {
            'title': 'Demobilisation per Km',
            'value': null,
            'standby_value': null
        }
    }]
};

const saveEngagement = {
    'data': {
        'type': 'engagements',
        'id': null,
        'attributes': {
            'pending-enagagement': true,
            'sent-enagagement': false,
            'purchase-order': 1234,
            'plan-start-date': null
        },
        'relationships': {
            'matched-items': {
                'data': {
                    'type': 'matched-items',
                    'id': 111
                }
            },
            'pricing-options': {
                'data': [{
                    'type': 'pricing-options',
                    'id': 111,
                    'attributes': {
                        'name': 'Dry Weekly',
                        'rate': 1000
                    }
                }, {
                    'type': 'pricing-options',
                    'id': 111,
                    'attributes': {
                        'name': 'Wet Weekly',
                        'rate': 1500
                    }
                }]
            }
        }
    }
};


class ItemsApi {
    static getAllItems() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], fromRequestedItemsAPI));
            }, delay);
        });
    }

    static getMatchedItems() {
        return new Promise((resolve) => {
            setTimeout(() => {
                window.console.log(saveEngagement);
                resolve(Object.assign([], fromMatchedItemAPI));
            });
        });
    }
}

export default ItemsApi;

/*
searcher-quote-requests/22129/requested-items?filters[only_quoted_item]=1&include=quoteRequest,matchedItems.matchedSupplier
{"data":[{"type":"requested-items","id":"49548","attributes":{"title":"Skip Bin 3-6m3 (Procure IT)"},"relationships":{"quoteRequest":{"data":{"type":"quote-request","id":"22129"}},"matchedItems":{"data":[{"type":"matched-items","id":"3442143"},{"type":"matched-items","id":"3442232"},{"type":"matched-items","id":"3443224"}]}}},{"type":"requested-items","id":"49549","attributes":{"title":"Skip Bin 7-10m3 (Procure IT)"},"relationships":{"quoteRequest":{"data":{"type":"quote-request","id":"22129"}},"matchedItems":{"data":[{"type":"matched-items","id":"3441319"},{"type":"matched-items","id":"3443225"}]}}},{"type":"requested-items","id":"49550","attributes":{"title":"Skip Bin 11-15m3 (Procure IT)"},"relationships":{"quoteRequest":{"data":{"type":"quote-request","id":"22129"}},"matchedItems":{"data":[{"type":"matched-items","id":"3441335"}]}}},{"type":"requested-items","id":"49551","attributes":{"title":"Roll on Roll off Bin 15-20m3 (Procure IT)"},"relationships":{"quoteRequest":{"data":{"type":"quote-request","id":"22129"}},"matchedItems":{"data":[{"type":"matched-items","id":"3427397"},{"type":"matched-items","id":"3441318"},{"type":"matched-items","id":"3442861"}]}}},{"type":"requested-items","id":"49552","attributes":{"title":"Front Lift Bin 3m3 (Procure IT)"},"relationships":{"quoteRequest":{"data":{"type":"quote-request","id":"22129"}},"matchedItems":{"data":[{"type":"matched-items","id":"3427396"},{"type":"matched-items","id":"3442860"}]}}}],"included":[{"type":"supplier","id":"409149","attributes":{"title":"Enviro-Kare Skip Bins"}},{"type":"supplier","id":"409152","attributes":{"title":"BLUE BIN SERVICE BUNDABERG"}},{"type":"supplier","id":"409150","attributes":{"title":"Active Skip Bins"}},{"type":"supplier","id":"409153","attributes":{"title":"Bundy Skip Bins"}},{"type":"supplier","id":"409155","attributes":{"title":"Cleanaway Waste Management Ltd"}},{"type":"supplier","id":"409156","attributes":{"title":"J.J. Richards & Sons Pty Ltd"}},{"type":"quote-request","id":"22129","attributes":{"title":"12 Monthly (Waste Transfer Services )"}},{"type":"matched-items","id":"3442143","attributes":{"quantity":1,"title":"Enviro-Kare Skip Bin 6m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409149"}]}}},{"type":"matched-items","id":"3442232","attributes":{"quantity":1,"title":"3 CuMtr BLUE BIN SERVICE SKIP BIN"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409152"}]}}},{"type":"matched-items","id":"3443224","attributes":{"quantity":1,"title":"0"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409150"}]}}},{"type":"matched-items","id":"3441319","attributes":{"quantity":1,"title":"Skip Bin 10m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409153"}]}}},{"type":"matched-items","id":"3443225","attributes":{"quantity":1,"title":"0"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409150"}]}}},{"type":"matched-items","id":"3441335","attributes":{"quantity":1,"title":"15 cm"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409153"}]}}},{"type":"matched-items","id":"3427397","attributes":{"quantity":1,"title":"Roll On Roll Off Bin 15m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409155"}]}}},{"type":"matched-items","id":"3441318","attributes":{"quantity":1,"title":"RORO Skip Bin 20m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409153"}]}}},{"type":"matched-items","id":"3442861","attributes":{"quantity":1,"title":"Please refer to pricing schedule attached."},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409156"}]}}},{"type":"matched-items","id":"3427396","attributes":{"quantity":1,"title":"Front Lift Bin 3.0m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409155"}]}}},{"type":"matched-items","id":"3442860","attributes":{"quantity":1,"title":"Please refer to pricing schedule attached"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409156"}]}}}]}

searcher-quote-requests/22129/engagements?include=matchedItem.matchedSupplier,matchedItem.requestedItem
{"data":[{"type":"engagements","id":"2","attributes":{"status":1,"po_number":"2","po_value":0,"pre_start_date":"2017-02-02"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3441319"}},"engagementDetails":{"data":[{"type":"engagement-details","id":"2"}]}}},{"type":"engagements","id":"5","attributes":{"status":1,"po_number":"1","po_value":0,"pre_start_date":"2017-01-04"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3441335"}},"engagementDetails":{"data":[{"type":"engagement-details","id":"5"}]}}},{"type":"engagements","id":"8","attributes":{"status":1,"po_number":"5","po_value":0,"pre_start_date":"2017-01-12"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3442232"}},"engagementDetails":{"data":[{"type":"engagement-details","id":"8"}]}}}],"included":[{"type":"supplier","id":"409153","attributes":{"title":"Bundy Skip Bins"}},{"type":"requested-item","id":"49549","attributes":{"title":"Skip Bin 7-10m3 (Procure IT)"}},{"type":"pricing-option","id":"2","attributes":{"title":"Dry Daily"}},{"type":"requested-item","id":"49550","attributes":{"title":"Skip Bin 11-15m3 (Procure IT)"}},{"type":"supplier","id":"409152","attributes":{"title":"BLUE BIN SERVICE BUNDABERG"}},{"type":"requested-item","id":"49548","attributes":{"title":"Skip Bin 3-6m3 (Procure IT)"}},{"type":"user","id":"1","attributes":{"first_name":"Troy","last_name":"Redden","mobile":"07 4130 4550","is_organisation_admin":1,"position":"","staff_company":null,"staff_phone":"07 4130 4550","state_id":10424}},{"type":"matched-item","id":"3441319","attributes":{"quantity":1,"title":"Skip Bin 10m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409153"}]},"requestedItem":{"data":{"type":"requested-item","id":"49549"}}}},{"type":"engagement-details","id":"2","attributes":{"rate_value":370,"unit":2},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}},{"type":"matched-item","id":"3441335","attributes":{"quantity":1,"title":"15 cm"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409153"}]},"requestedItem":{"data":{"type":"requested-item","id":"49550"}}}},{"type":"engagement-details","id":"5","attributes":{"rate_value":380,"unit":1},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}},{"type":"matched-item","id":"3442232","attributes":{"quantity":1,"title":"3 CuMtr BLUE BIN SERVICE SKIP BIN"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409152"}]},"requestedItem":{"data":{"type":"requested-item","id":"49548"}}}},{"type":"engagement-details","id":"8","attributes":{"rate_value":1,"unit":5},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}}]}

searcher-quote-requests/22129/requested-items/49548/matched-items/3442143?include=pricingOptions,matchedSupplier,quoteRequestEngagements,quoteRequestEngagements.createdBy,quoteRequestEngagements.engagementDetails,quoteRequestEngagements.matchedItem&fields[pricing-options]=title,value,standby_value&fields[engagement]=status,engagement_text,po_value
{"data":{"type":"matched-item","id":"3442143","attributes":{"quantity":1,"title":"Enviro-Kare Skip Bin 6m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409149"}]},"quoteRequestEngagements":{"data":[]},"pricingOptions":{"data":[{"type":"pricing-options","id":"2"}]}}},"included":[{"type":"supplier","id":"409149","attributes":{"title":"Enviro-Kare Skip Bins"}},{"type":"pricing-options","id":"2","attributes":{"title":"Dry Daily","value":null,"standby_value":null}}]}
{"data":{"type":"matched-item","id":"3442232","attributes":{"quantity":1,"title":"3 CuMtr BLUE BIN SERVICE SKIP BIN"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409152"}]},"quoteRequestEngagements":{"data":[{"type":"engagements","id":"8"}]},"pricingOptions":{"data":[{"type":"pricing-options","id":"2"}]}}},"included":[{"type":"pricing-option","id":"2","attributes":{"title":"Dry Daily"}},{"type":"user","id":"1","attributes":{"first_name":"Troy","last_name":"Redden","mobile":"07 4130 4550","is_organisation_admin":1,"position":"","staff_company":null,"staff_phone":"07 4130 4550","state_id":10424}},{"type":"engagement-details","id":"8","attributes":{"rate_value":1,"unit":5},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}},{"type":"supplier","id":"409152","attributes":{"title":"BLUE BIN SERVICE BUNDABERG"}},{"type":"engagements","id":"8","attributes":{"status":1,"po_number":"5","po_value":0,"pre_start_date":"2017-01-12"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3442232"}},"engagementDetails":{"data":[{"type":"engagement-details","id":"8"}]}}},{"type":"pricing-options","id":"2","attributes":{"title":"Dry Daily","value":1,"standby_value":1}}]}
{"data":{"type":"matched-item","id":"3443224","attributes":{"quantity":1,"title":"0"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409150"}]},"quoteRequestEngagements":{"data":[]},"pricingOptions":{"data":[{"type":"pricing-options","id":"2"}]}}},"included":[{"type":"supplier","id":"409150","attributes":{"title":"Active Skip Bins"}},{"type":"pricing-options","id":"2","attributes":{"title":"Dry Daily","value":null,"standby_value":null}}]}
{"data":{"type":"matched-item","id":"3441319","attributes":{"quantity":1,"title":"Skip Bin 10m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409153"}]},"quoteRequestEngagements":{"data":[{"type":"engagements","id":"2"}]},"pricingOptions":{"data":[{"type":"pricing-options","id":"2"}]}}},"included":[{"type":"pricing-option","id":"2","attributes":{"title":"Dry Daily"}},{"type":"user","id":"1","attributes":{"first_name":"Troy","last_name":"Redden","mobile":"07 4130 4550","is_organisation_admin":1,"position":"","staff_company":null,"staff_phone":"07 4130 4550","state_id":10424}},{"type":"engagement-details","id":"2","attributes":{"rate_value":370,"unit":2},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}},{"type":"supplier","id":"409153","attributes":{"title":"Bundy Skip Bins"}},{"type":"engagements","id":"2","attributes":{"status":1,"po_number":"2","po_value":0,"pre_start_date":"2017-02-02"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3441319"}},"engagementDetails":{"data":[{"type":"engagement-details","id":"2"}]}}},{"type":"pricing-options","id":"2","attributes":{"title":"Dry Daily","value":370,"standby_value":null}}]}

POST
Request URL:https://api.pm.local.dev/searcher-quote-requests/22129/requested-items/49549/matched-items/3441319/engagements
{"data":{"type":"engagements","id":"9","attributes":{"status":1,"po_number":"456","po_value":0,"pre_start_date":"2015-12-31"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3441319"}},"engagementDetails":{"data":[]}}},"included":[{"type":"user","id":"1","attributes":{"first_name":"Troy","last_name":"Redden","mobile":"07 4130 4550","is_organisation_admin":1,"position":"","staff_company":null,"staff_phone":"07 4130 4550","state_id":10424}},{"type":"matched-item","id":"3441319","attributes":{"quantity":1,"title":"Skip Bin 10m3"}}]}

Request URL:https://api.pm.local.dev/searcher-quote-requests/22129/requested-items/49549/matched-items/3441319/engagements/9/engagement-details
{"data":{"type":"engagement-details","id":"9","attributes":{"rate_value":370,"unit":"456"},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}},"included":[{"type":"pricing-option","id":"2","attributes":{"title":"Dry Daily"}}]}

after above POST -> GET
searcher-quote-requests/22129/engagements?include=matchedItem.matchedSupplier,matchedItem.requestedItem
{"data":[{"type":"engagements","id":"2","attributes":{"status":1,"po_number":"2","po_value":0,"pre_start_date":"2017-02-02"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3441319"}},"engagementDetails":{"data":[{"type":"engagement-details","id":"2"}]}}},{"type":"engagements","id":"5","attributes":{"status":1,"po_number":"1","po_value":0,"pre_start_date":"2017-01-04"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3441335"}},"engagementDetails":{"data":[{"type":"engagement-details","id":"5"}]}}},{"type":"engagements","id":"8","attributes":{"status":1,"po_number":"5","po_value":0,"pre_start_date":"2017-01-12"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3442232"}},"engagementDetails":{"data":[{"type":"engagement-details","id":"8"}]}}},{"type":"engagements","id":"9","attributes":{"status":1,"po_number":"456","po_value":0,"pre_start_date":"2015-12-31"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3441319"}},"engagementDetails":{"data":[{"type":"engagement-details","id":"9"}]}}}],"included":[{"type":"supplier","id":"409153","attributes":{"title":"Bundy Skip Bins"}},{"type":"requested-item","id":"49549","attributes":{"title":"Skip Bin 7-10m3 (Procure IT)"}},{"type":"pricing-option","id":"2","attributes":{"title":"Dry Daily"}},{"type":"requested-item","id":"49550","attributes":{"title":"Skip Bin 11-15m3 (Procure IT)"}},{"type":"supplier","id":"409152","attributes":{"title":"BLUE BIN SERVICE BUNDABERG"}},{"type":"requested-item","id":"49548","attributes":{"title":"Skip Bin 3-6m3 (Procure IT)"}},{"type":"user","id":"1","attributes":{"first_name":"Troy","last_name":"Redden","mobile":"07 4130 4550","is_organisation_admin":1,"position":"","staff_company":null,"staff_phone":"07 4130 4550","state_id":10424}},{"type":"matched-item","id":"3441319","attributes":{"quantity":1,"title":"Skip Bin 10m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409153"}]},"requestedItem":{"data":{"type":"requested-item","id":"49549"}}}},{"type":"engagement-details","id":"2","attributes":{"rate_value":370,"unit":2},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}},{"type":"matched-item","id":"3441335","attributes":{"quantity":1,"title":"15 cm"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409153"}]},"requestedItem":{"data":{"type":"requested-item","id":"49550"}}}},{"type":"engagement-details","id":"5","attributes":{"rate_value":380,"unit":1},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}},{"type":"matched-item","id":"3442232","attributes":{"quantity":1,"title":"3 CuMtr BLUE BIN SERVICE SKIP BIN"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409152"}]},"requestedItem":{"data":{"type":"requested-item","id":"49548"}}}},{"type":"engagement-details","id":"8","attributes":{"rate_value":1,"unit":5},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}},{"type":"engagement-details","id":"9","attributes":{"rate_value":370,"unit":456},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}}]}

*/

/*
// Request URL:https://api.pm.local.dev/searcher-quote-requests/22129/engagements?include=matchedItem.matchedSupplier,matchedItem.requestedItem
// {"data":[{"type":"engagements","id":"3","attributes":{"status":1,"po_number":"1234","po_value":0,"pre_start_date":"2016-12-31"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3441319"}},"engagementDetails":{"data":[{"type":"engagement-details","id":"2"}]}}},{"type":"engagements","id":"4","attributes":{"status":1,"po_number":"2222","po_value":0,"pre_start_date":"2016-12-22"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3427397"}},"engagementDetails":{"data":[{"type":"engagement-details","id":"3"}]}}},{"type":"engagements","id":"5","attributes":{"status":1,"po_number":"5555","po_value":0,"pre_start_date":"2016-12-25"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3442232"}},"engagementDetails":{"data":[{"type":"engagement-details","id":"4"}]}}},{"type":"engagements","id":"6","attributes":{"status":1,"po_number":"4444","po_value":0,"pre_start_date":"2016-12-24"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3427396"}},"engagementDetails":{"data":[{"type":"engagement-details","id":"5"}]}}}],"included":[{"type":"supplier","id":"409153","attributes":{"title":"Bundy Skip Bins"}},{"type":"requested-item","id":"49549","attributes":{"title":"Skip Bin 7-10m3 (Procure IT)"}},{"type":"pricing-option","id":"2","attributes":{"title":"Dry Daily"}},{"type":"supplier","id":"409155","attributes":{"title":"Cleanaway Waste Management Ltd"}},{"type":"requested-item","id":"49551","attributes":{"title":"Roll on Roll off Bin 15-20m3 (Procure IT)"}},{"type":"supplier","id":"409152","attributes":{"title":"BLUE BIN SERVICE BUNDABERG"}},{"type":"requested-item","id":"49548","attributes":{"title":"Skip Bin 3-6m3 (Procure IT)"}},{"type":"requested-item","id":"49552","attributes":{"title":"Front Lift Bin 3m3 (Procure IT)"}},{"type":"user","id":"1","attributes":{"first_name":"Troy","last_name":"Redden","mobile":"07 4130 4550","is_organisation_admin":1,"position":"","staff_company":null,"staff_phone":"07 4130 4550","state_id":10424}},{"type":"matched-item","id":"3441319","attributes":{"quantity":1,"title":"Skip Bin 10m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409153"}]},"requestedItem":{"data":{"type":"requested-item","id":"49549"}}}},{"type":"engagement-details","id":"2","attributes":{"rate_value":370,"unit":1234567},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}},{"type":"matched-item","id":"3427397","attributes":{"quantity":1,"title":"Roll On Roll Off Bin 15m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409155"}]},"requestedItem":{"data":{"type":"requested-item","id":"49551"}}}},{"type":"engagement-details","id":"3","attributes":{"rate_value":215,"unit":43221234},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}},{"type":"matched-item","id":"3442232","attributes":{"quantity":1,"title":"3 CuMtr BLUE BIN SERVICE SKIP BIN"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409152"}]},"requestedItem":{"data":{"type":"requested-item","id":"49548"}}}},{"type":"engagement-details","id":"4","attributes":{"rate_value":1,"unit":5555},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}},{"type":"matched-item","id":"3427396","attributes":{"quantity":1,"title":"Front Lift Bin 3.0m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409155"}]},"requestedItem":{"data":{"type":"requested-item","id":"49552"}}}},{"type":"engagement-details","id":"5","attributes":{"rate_value":34.5,"unit":4444},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}}]}

// Request URL:https://api.pm.local.dev/searcher-quote-requests/22129/requested-items?filters[only_quoted_item]=1&include=quoteRequest,matchedItems.matchedSupplier
// {"data":[{"type":"requested-items","id":"49548","attributes":{"title":"Skip Bin 3-6m3 (Procure IT)"},"relationships":{"quoteRequest":{"data":{"type":"quote-request","id":"22129"}},"matchedItems":{"data":[{"type":"matched-items","id":"3442143"},{"type":"matched-items","id":"3442232"},{"type":"matched-items","id":"3443224"}]}}},{"type":"requested-items","id":"49549","attributes":{"title":"Skip Bin 7-10m3 (Procure IT)"},"relationships":{"quoteRequest":{"data":{"type":"quote-request","id":"22129"}},"matchedItems":{"data":[{"type":"matched-items","id":"3441319"},{"type":"matched-items","id":"3443225"}]}}},{"type":"requested-items","id":"49550","attributes":{"title":"Skip Bin 11-15m3 (Procure IT)"},"relationships":{"quoteRequest":{"data":{"type":"quote-request","id":"22129"}},"matchedItems":{"data":[{"type":"matched-items","id":"3441335"}]}}},{"type":"requested-items","id":"49551","attributes":{"title":"Roll on Roll off Bin 15-20m3 (Procure IT)"},"relationships":{"quoteRequest":{"data":{"type":"quote-request","id":"22129"}},"matchedItems":{"data":[{"type":"matched-items","id":"3427397"},{"type":"matched-items","id":"3441318"},{"type":"matched-items","id":"3442861"}]}}},{"type":"requested-items","id":"49552","attributes":{"title":"Front Lift Bin 3m3 (Procure IT)"},"relationships":{"quoteRequest":{"data":{"type":"quote-request","id":"22129"}},"matchedItems":{"data":[{"type":"matched-items","id":"3427396"},{"type":"matched-items","id":"3442860"}]}}}],"included":[{"type":"supplier","id":"409149","attributes":{"title":"Enviro-Kare Skip Bins"}},{"type":"supplier","id":"409152","attributes":{"title":"BLUE BIN SERVICE BUNDABERG"}},{"type":"supplier","id":"409150","attributes":{"title":"Active Skip Bins"}},{"type":"supplier","id":"409153","attributes":{"title":"Bundy Skip Bins"}},{"type":"supplier","id":"409155","attributes":{"title":"Cleanaway Waste Management Ltd"}},{"type":"supplier","id":"409156","attributes":{"title":"J.J. Richards & Sons Pty Ltd"}},{"type":"quote-request","id":"22129","attributes":{"title":"12 Monthly (Waste Transfer Items )"}},{"type":"matched-items","id":"3442143","attributes":{"quantity":1,"title":"Enviro-Kare Skip Bin 6m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409149"}]}}},{"type":"matched-items","id":"3442232","attributes":{"quantity":1,"title":"3 CuMtr BLUE BIN SERVICE SKIP BIN"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409152"}]}}},{"type":"matched-items","id":"3443224","attributes":{"quantity":1,"title":"0"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409150"}]}}},{"type":"matched-items","id":"3441319","attributes":{"quantity":1,"title":"Skip Bin 10m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409153"}]}}},{"type":"matched-items","id":"3443225","attributes":{"quantity":1,"title":"0"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409150"}]}}},{"type":"matched-items","id":"3441335","attributes":{"quantity":1,"title":"15 cm"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409153"}]}}},{"type":"matched-items","id":"3427397","attributes":{"quantity":1,"title":"Roll On Roll Off Bin 15m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409155"}]}}},{"type":"matched-items","id":"3441318","attributes":{"quantity":1,"title":"RORO Skip Bin 20m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409153"}]}}},{"type":"matched-items","id":"3442861","attributes":{"quantity":1,"title":"Please refer to pricing schedule attached."},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409156"}]}}},{"type":"matched-items","id":"3427396","attributes":{"quantity":1,"title":"Front Lift Bin 3.0m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409155"}]}}},{"type":"matched-items","id":"3442860","attributes":{"quantity":1,"title":"Please refer to pricing schedule attached"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409156"}]}}}]}

// Request URL:https://api.pm.local.dev/searcher-quote-requests/22129/requested-items/49549/matched-items/3441319?include=pricingOptions,matchedSupplier,quoteRequestEngagements,quoteRequestEngagements.createdBy,quoteRequestEngagements.engagementDetails,quoteRequestEngagements.matchedItem&fields[pricing-options]=title,value,standby_value&fields[engagement]=status,engagement_text,po_value
// {"data":{"type":"matched-item","id":"3441319","attributes":{"quantity":1,"title":"Skip Bin 10m3"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409153"}]},"quoteRequestEngagements":{"data":[{"type":"engagements","id":"3"}]},"pricingOptions":{"data":[{"type":"pricing-options","id":"2"}]}}},"included":[{"type":"pricing-option","id":"2","attributes":{"title":"Dry Daily"}},{"type":"user","id":"1","attributes":{"first_name":"Troy","last_name":"Redden","mobile":"07 4130 4550","is_organisation_admin":1,"position":"","staff_company":null,"staff_phone":"07 4130 4550","state_id":10424}},{"type":"engagement-details","id":"2","attributes":{"rate_value":370,"unit":1234567},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}},{"type":"supplier","id":"409153","attributes":{"title":"Bundy Skip Bins"}},{"type":"engagements","id":"3","attributes":{"status":1,"po_number":"1234","po_value":0,"pre_start_date":"2016-12-31"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3441319"}},"engagementDetails":{"data":[{"type":"engagement-details","id":"2"}]}}},{"type":"pricing-options","id":"2","attributes":{"title":"Dry Daily","value":370,"standby_value":null}}]}

// Request URL:https://api.pm.local.dev/searcher-quote-requests/22129/requested-items/49548/matched-items/3442232?include=pricingOptions,matchedSupplier,quoteRequestEngagements,quoteRequestEngagements.createdBy,quoteRequestEngagements.engagementDetails,quoteRequestEngagements.matchedItem&fields[pricing-options]=title,value,standby_value&fields[engagement]=status,engagement_text,po_value
// {"data":{"type":"matched-item","id":"3442232","attributes":{"quantity":1,"title":"3 CuMtr BLUE BIN SERVICE SKIP BIN"},"relationships":{"matchedSupplier":{"data":[{"type":"supplier","id":"409152"}]},"quoteRequestEngagements":{"data":[{"type":"engagements","id":"5"}]},"pricingOptions":{"data":[{"type":"pricing-options","id":"2"}]}}},"included":[{"type":"pricing-option","id":"2","attributes":{"title":"Dry Daily"}},{"type":"user","id":"1","attributes":{"first_name":"Troy","last_name":"Redden","mobile":"07 4130 4550","is_organisation_admin":1,"position":"","staff_company":null,"staff_phone":"07 4130 4550","state_id":10424}},{"type":"engagement-details","id":"4","attributes":{"rate_value":1,"unit":5555},"relationships":{"pricingOption":{"data":{"type":"pricing-option","id":"2"}}}},{"type":"supplier","id":"409152","attributes":{"title":"BLUE BIN SERVICE BUNDABERG"}},{"type":"engagements","id":"5","attributes":{"status":1,"po_number":"5555","po_value":0,"pre_start_date":"2016-12-25"},"relationships":{"user":{"data":{"type":"user","id":"1"}},"matchedItem":{"data":{"type":"matched-item","id":"3442232"}},"engagementDetails":{"data":[{"type":"engagement-details","id":"4"}]}}},{"type":"pricing-options","id":"2","attributes":{"title":"Dry Daily","value":1,"standby_value":1}}]}

// Request URL:https://api.pm.local.dev/searcher-quote-requests/22129/requested-items/49549/matched-items/3441319/engagements/3
// Delete
// {"id":"3","status":"deleted"}
*/
