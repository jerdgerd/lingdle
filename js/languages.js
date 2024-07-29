const languages = {
    "ab":{"Language":"Abkhazian","Language Families":["Abkhaz-Adyge","Abkhaz-Abaza"],"Pruned Language Families":"Abkhaz-Adyge"},
    "af":{"Language":"Afrikaans","Language Families":["Indo-European","Classical Indo-European","Germanic","Northwest Germanic","West Germanic","Macro-Dutch","Middle-Modern Dutch","Modern Dutch","Global Dutch","Afrikaansic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Germanic, Northwest Germanic, West Germanic, Macro-Dutch, Middle-Modern Dutch, Modern Dutch, Global Dutch"},
    "am":{"Language":"Amharic","Language Families":["Afro-Asiatic","Semitic","West Semitic","Ethiosemitic","South Ethiopic","Amharic-Argobba"],"Pruned Language Families":"Afro-Asiatic, Semitic, West Semitic"},
    "ar":{"Language":"Arabic","Language Families":["Afro-Asiatic","Semitic","West Semitic","Central Semitic","Arabian","Arabic"],"Pruned Language Families":"Afro-Asiatic, Semitic, West Semitic, Central Semitic, Arabian, Arabic"},
    "as":{"Language":"Assamese","Language Families":["Indo-European","Classical Indo-European","Indo-Iranian","Indo-Aryan","Middle-Modern Indo-Aryan","Continental Indo-Aryan","Indo-Aryan Eastern zone","Oriya-Gauda-Kamrupa","Gauda-Kamrupa","Kamrupa","Eastern Kamrupa"],"Pruned Language Families":"Indo-European, Classical Indo-European, Indo-Iranian, Indo-Aryan, Middle-Modern Indo-Aryan, Continental Indo-Aryan, Indo-Aryan Eastern zone, Oriya-Gauda-Kamrupa, Gauda-Kamrupa"},
    "az":{"Language":"Azerbaijani","Language Families":["Turkic","Common Turkic","Oghuz","Nuclear Oghuz"],"Pruned Language Families":"Turkic, Common Turkic, Oghuz, Nuclear Oghuz"},
    "ba":{"Language":"Bashkir","Language Families":["Turkic","Common Turkic","Kipchak-Turkestan","Kipchak","Northwest Kipchak","North Kipchak","Bashkiric"],"Pruned Language Families":"Turkic, Common Turkic, Kipchak-Turkestan, Kipchak, Northwest Kipchak, North Kipchak, Bashkiric"},
    "be":{"Language":"Belarusian","Language Families":["Indo-European","Classical Indo-European","Balto-Slavic","Slavic","East Slavic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Balto-Slavic, Slavic, East Slavic"},
    "bg":{"Language":"Bulgarian","Language Families":["Indo-European","Classical Indo-European","Balto-Slavic","Slavic","South Slavic","Eastern South Slavic","Macedo-Bulgarian"],"Pruned Language Families":"Indo-European, Classical Indo-European, Balto-Slavic, Slavic, South Slavic, Eastern South Slavic, Macedo-Bulgarian"},
    "bn":{"Language":"Bengali","Language Families":["Indo-European","Classical Indo-European","Indo-Iranian","Indo-Aryan","Middle-Modern Indo-Aryan","Continental Indo-Aryan","Indo-Aryan Eastern zone","Oriya-Gauda-Kamrupa","Gauda-Kamrupa","Gauda-Banga"],"Pruned Language Families":"Indo-European, Classical Indo-European, Indo-Iranian, Indo-Aryan, Middle-Modern Indo-Aryan, Continental Indo-Aryan, Indo-Aryan Eastern zone, Oriya-Gauda-Kamrupa, Gauda-Kamrupa"},
    "bo":{"Language":"Tibetan","Language Families":["Sino-Tibetan","Bodic","Bodish","Early Old Tibetan","Middle Old Tibetan","Late Old Tibetan","Central Tibetan"],"Pruned Language Families":"Sino-Tibetan"},
    "br":{"Language":"Breton","Language Families":["Indo-European","Classical Indo-European","Celtic","Nuclear Celtic","Core Celtic","Insular Celtic","Brythonic","Southwestern Brythonic","Middle-Modern Southwestern Brythonic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Celtic, Nuclear Celtic, Core Celtic, Insular Celtic, Brythonic"},
    "bs":{"Language":"Bosnian","Language Families":["Indo-European","Classical Indo-European","Balto-Slavic","Slavic","South Slavic","Western South Slavic","Serbian-Croatian-Bosnian"],"Pruned Language Families":"Indo-European, Classical Indo-European, Balto-Slavic, Slavic, South Slavic, Western South Slavic, Serbian-Croatian-Bosnian"},
    "ca":{"Language":"Catalan","Language Families":["Indo-European","Classical Indo-European","Italic","Latino Faliscan","Latinic","Imperial Latin","Romance","Italo-Western Romance","Western Romance","Shifted Western Romance","Southwestern Shifted Romance"],"Pruned Language Families":"Indo-European, Classical Indo-European, Italic, Latinic, Imperial Latin, Romance, Italo-Western Romance, Western Romance, Shifted Western Romance, Southwestern Shifted Romance"},
    "ceb":{"Language":"Cebuano","Language Families":["Austronesian","Malayo-Polynesian","Greater Central Philipine","Central Philipine","Bisayan"],"Pruned Language Families":"Austronesian, Malayo-Polynesian, Bisayan"},
    "cs":{"Language":"Czech","Language Families":["Indo-European","Classical Indo-European","Balto-Slavic","Slavic","West Slavic","Czech-Slovak","Czech"],"Pruned Language Families":"Indo-European, Classical Indo-European, Balto-Slavic, Slavic, West Slavic, Czech-Slovak"},
    "cy":{"Language":"Welsh","Language Families":["Indo-European","Classical Indo-European","Celtic","Nuclear Celtic","Core Celtic","Insular Celtic","Brythonic","Old-Modern Welsh"],"Pruned Language Families":"Indo-European, Classical Indo-European, Celtic, Nuclear Celtic, Core Celtic, Insular Celtic, Brythonic"},
    "da":{"Language":"Danish","Language Families":["Indo-European","Classical Indo-European","Germanic","Northwest Germanic","North Germanic","South Scandinavian"],"Pruned Language Families":"Indo-European, Classical Indo-European, Germanic, Northwest Germanic, North Germanic"},
    "de":{"Language":"German","Language Families":["Indo-European","Classical Indo-European","Germanic","Northwest Germanic","West Germanic","High German","Upper German","Middle-Modern High German","Modern High German","Upper Franconian","Global German"],"Pruned Language Families":"Indo-European, Classical Indo-European, Germanic, Northwest Germanic, West Germanic, High German"},
    "el":{"Language":"Greek","Language Families":["Indo-European","Classical Indo-European","Graeco-Phyrgian","Greek","South Greek","Central Greek","Koineic Greek","Modern Koineic Greek","Nuclear Modern Greek"],"Pruned Language Families":"Indo-European, Classical Indo-European"},
    "en":{"Language":"English","Language Families":["Indo-European","Classical Indo-European","Germanic","Northwest Germanic","West Germanic","North Sea Germanic","Anglo-Frisian","Anglic","Later Anglic","Middle-Modern English","Macro-English"],"Pruned Language Families":"Indo-European, Classical Indo-European, Germanic, Northwest Germanic, West Germanic, North Sea Germanic, Anglo-Frisian, Anglic, Later Anglic"},
    "eo":{"Language":"Esperanto","Language Families":["Artificial Language"],"Pruned Language Families":"Artificial Language"},
    "es":{"Language":"Spanish","Language Families":["Indo-European","Classical Indo-European","Italic","Latino-Faliscan","Latinic","Imperial Latin","Romance","Italo-Western Romance","Western Romance","Shifted Western Romance","Southwestern Shifted Romance","West Ibero-Romance","Castillic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Italic, Latino-Faliscan, Latinic, Imperial Latin, Romance, Italo-Western Romance, Western Romance, Shifted Western Romance, Southwestern Shifted Romance, West Ibero-Romance"},
    "et":{"Language":"Estonian","Language Families":["Uralic","Finnic","Coastal Finnic","Neva","Central Finnic"],"Pruned Language Families":"Uralic, Finnic, Coastal Finnic, Neva"},
    "eu":{"Language":"Basque","Language Families":["Isolate"],"Pruned Language Families":"Isolate"},
    "fa":{"Language":"Persian","Language Families":["Indo-European","Classical Indo-European","Indo-Iranian","Iranian","Middle-Modern Persian Souothwestern Iranian","Modern Southwestern Iranian","Farsic-Caucasian Tat","Farsic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Indo-Iranian, Iranian, Modern Southwestern Iranian, Farsic-Caucasian Tat, Farsic"},
    "fi":{"Language":"Finnish","Language Families":["Uralic","Finnic","Coastal Finnic","Neva","North Finnic","Nuclear Finnish"],"Pruned Language Families":"Uralic, Finnic, Coastal Finnic, Neva"},
    "fo":{"Language":"Faroese","Language Families":["Indo-European","Classical Indo-European","Germanic","Northwest Germanic","North Germanic","West Scandinavian","Icelandic-Faroese"],"Pruned Language Families":"Indo-European, Classical Indo-European, Germanic, Northwest Germanic, North Germanic, West Scandinavian, Icelandic-Faroese"},
    "fr":{"Language":"French","Language Families":["Indo-European","Classical Indo-European","Italic","Latino-Faliscan","Latinic","Imperial Latin","Romance","Italo-Western Romance","Western Romance","Shifted Western Romance","Northwestern Shifted Romance","Gallo-Rhaetian","Oil","Central Oil","Macro-French","Global French"],"Pruned Language Families":"Indo-European, Classical Indo-European, Italic, Latino-Faliscan, Latinic, Imperial Latin, Romance, Italo-Western Romance, Western Romance, Shifted Western Romance, Northwestern Shifted Romance, Gallo-Rhaetian, Oil, Central Oil, Macro-French"},
    "gl":{"Language":"Galician","Language Families":["Indo-European","Classical Indo-European","Italic","Latino-Faliscan","Latinic","Imperial Latin","Romance","Italo-Western Romance","Shifted Western Romance","Southwestern Shifted Romance","West Ibero-Romance","Galician Romance"],"Pruned Language Families":"Indo-European, Classical Indo-European, Italic, Latino-Faliscan, Latinic, Imperial Latin, Romance, Italo-Western Romance, Shifted Western Romance, Southwestern Shifted Romance, West Ibero-Romance, Galician Romance"},
    "gn":{"Language":"Guarani","Language Families":["Tupian","Eastern Tupian","Maweti-Guarani","Aweti-Guarani","Tupi-Guarani"],"Pruned Language Families":"Tupian"},
    "gu":{"Language":"Gujarati","Language Families":["Indo-European","Classical Indo-European","Indo-Iranian","Indo-Aryan","Middle-Modern Indo-Aryan","Continental Indo-Aryan","Midlands Indo-Aryan","Apabhramsic","Gujarati-Rajastani","Gujaratic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Indo-Iranian, Indo-Aryan, Middle-Modern Indo-Aryan, Continental Indo-Aryan, Midlands Indo-Aryan"},
    "gv":{"Language":"Manx","Language Families":["Indo-European","Classical Indo-European","Celtic","Nuclear Celtic","Core Celtic","Insular Celtic","Goidelic","Modern Goidelic","Eastern Goidelic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Celtic, Nuclear Celtic, Core Celtic, Insular Celtic"},
    "ha":{"Language":"Hausa","Language Families":["Afro-Asiatic","Chadic","West Chadic","West Chadic A","West Chadic A.1"],"Pruned Language Families":"Afro-Asiatic"},
    "haw":{"Language":"Hawaiian","Language Families":["Austronesian","Malayo-Polynesian","Eastern Malayo-Polynesian","Oceanic","Central Pacific linkage","Tokalau Fijian","Polynesian","Nuclear Polynesian","Solomons Northern Outlier Polynesian-East Polynesian Northern Outlier Polynesian-East Polynesian","Central Northern Outlier Polynesian-East Polynesian","East Polynesian","East Polynesian Proximal"],"Pruned Language Families":"Austronesian, Malayo-Polynesian, Eastern Malayo-Polynesian, Oceanic, Central Pacific linkage, Tokalau Fijian, Polynesian, Nuclear Polynesian, Central Northern Outlier Polynesian-East Polynesian, East Polynesian, East Polynesian Proximal"},
    "hi":{"Language":"Hindi","Language Families":["Indo-European","Classical Indo-European","Indo-Iranian","Indo-Aryan","Middle-Modern Indo-Aryan","Continental Indo-Aryan","Midlands Indo-Aryan","Shaurasenic","Indo-Aryan Central zone","Western Hindi","Hindustani"],"Pruned Language Families":"Indo-European, Classical Indo-European, Indo-Iranian, Indo-Aryan, Middle-Modern Indo-Aryan, Continental Indo-Aryan, Midlands Indo-Aryan, Shaurasenic, Indo-Aryan Central zone, Western Hindi, Hindustani"},
    "hr":{"Language":"Croatian","Language Families":["Indo-European","Classical Indo-European","Balto-Slavic","Slavic","South Slavic","Western South Slavic","Serbian-Croatian-Bosnian"],"Pruned Language Families":"Indo-European, Classical Indo-European, Balto-Slavic, Slavic, South Slavic, Western South Slavic, Serbian-Croatian-Bosnian"},
    "ht":{"Language":"Haitian","Language Families":["Indo-European","Classical Indo-European","Italic","Latino-Faliscan","Latinic","Imperial Latin","Romance","Italo-Western Romance","Western Romance","Shifted Western Romance","Northwestern Shifted Romance","Gallo-Rhaetian","Oil","Central Oil","Macro-French","Circum-Caribbean French","Haitian"],"Pruned Language Families":"Indo-European, Classical Indo-European, Italic, Latino-Faliscan, Latinic, Imperial Latin, Romance, Italo-Western Romance, Western Romance, Shifted Western Romance, Northwestern Shifted Romance, Gallo-Rhaetian, Oil, Central Oil, Macro-French"},
    "hu":{"Language":"Hungarian","Language Families":["Uralic","Hungaric"],"Pruned Language Families":"Uralic"},
    "hy":{"Language":"Armenian","Language Families":["Indo-European","Classical Indo-European","Armenic"],"Pruned Language Families":"Indo-European, Classical Indo-European"},
    "ia":{"Language":"Interlingua","Language Families":["Artificial Language"],"Pruned Language Families":"Artificial Language"},
    "id":{"Language":"Indonesian","Language Families":["Austronesian","Malayo-Polynesian","Malayo-Chamic","Malayic","Nuclear Malayic","Standard Malay-Indonesian"],"Pruned Language Families":"Austronesian, Malayo-Polynesian, Malayo-Chamic, Malayic, Nuclear Malayic, Standard Malay-Indonesian"},
    "is":{"Language":"Icelandic","Language Families":["Indo-European","Classical Indo-European","Germanic","Northwest Germanic","North Germanic","West Scandinavian","Icelandic-Faroese"],"Pruned Language Families":"Indo-European, Classical Indo-European, Germanic, Northwest Germanic, North Germanic, West Scandinavian, Icelandic-Faroese"},
    "it":{"Language":"Italian","Language Families":["Indo-European","Classical Indo-European","Italic","Latino-Faliscan","Latinic","Imperial Latin","Romance","Italo-Western Romance","Italo-Dalmatian","Italian Romance","Italian"],"Pruned Language Families":"Indo-European, Classical Indo-European, Italic, Latino-Faliscan, Latinic, Imperial Latin, Romance, Italo-Western Romance"},
    "iw":{"Language":"Hebrew","Language Families":["Afro-Asiatic","Semitic","West Semitic","Central Semitic","Northwest Semitic","Canaanite","Hebrewic"],"Pruned Language Families":"Afro-Asiatic, Semitic, West Semitic, Central Semitic"},
    "ja":{"Language":"Japanese","Language Families":["Japonic","Japanesic","Japan-Taiwan Japanese"],"Pruned Language Families":"Japonic"},
    "jw":{"Language":"Javanese","Language Families":["Austronesian","Malayo-Polynesian","Javanesic","Modern Javanese","Global Javanese"],"Pruned Language Families":"Austronesian, Malayo-Polynesian"},
    "ka":{"Language":"Georgian","Language Families":["Kartvelian","Georgian-Zan","Georgic"],"Pruned Language Families":"Kartvelian"},
    "kk":{"Language":"Kazakh","Language Families":["Turkic","Common Turkic","Kipchak-Turkestan","Kipchak","Southeast Kipchak","South Kipchak"],"Pruned Language Families":"Turkic, Common Turkic, Kipchak-Turkestan, Kipchak"},
    "km":{"Language":"Central Khmer","Language Families":["Austroasiatic","Khmeric"],"Pruned Language Families":"Austroasiatic"},
    "kn":{"Language":"Kannada","Language Families":["Dravidian","South Dravidian","South Dravidian I","Tamil-Kannada","Badaga-Kannada","Kannadoid","Nuclear Kannaoid"],"Pruned Language Families":"Dravidian, South Dravidian, South Dravidian I, Tamil-Kannada"},
    "ko":{"Language":"Korean","Language Families":["Koreanic"],"Pruned Language Families":"Koreanic"},
    "la":{"Language":"Latin","Language Families":["Indo-European","Classical Indo-European","Italic","Latino-Faliscan","Latinic","Imperial Latin"],"Pruned Language Families":"Indo-European, Classical Indo-European, Italic, Latino-Faliscan, Latinic, Imperial Latin"},
    "lb":{"Language":"Luxembourgish","Language Families":["Indo-European","Classical Indo-European","Germanic","Northwest Germanic","West Germanic","High German","Middle German","West Middle German","Moselle Franconian"],"Pruned Language Families":"Indo-European, Classical Indo-European, Germanic, Northwest Germanic, West Germanic, High German, Middle German"},
    "ln":{"Language":"Lingala","Language Families":["Atlantic-Congo","Volta-Congo","Benue-Congo","Bantoid","Southern Bantoid","Narrow Bantu","Central-Western Bantu","North Zaire River","Rivers Bantu","Ngiri","Ngiri Riverain Ubangi","Ngiri Riverain Ubangi-Ripuaire","Bobangic","Riverain","Bobangic","Bobangi-Bangala-Lingala","Lingala-Bangala"],"Pruned Language Families":"Atlantic-Congo, Volta-Congo, Benue-Congo, Bantoid, Southern Bantoid, Narrow Bantu, Bobangic, Bobangic"},
    "lo":{"Language":"Lao","Language Families":["Tai-Kadai","Kam-Tai","Daic-Beic","Daic","Central-Southwestern Tai","Wenma-Southwestern Tai","Sapa-Southwestern Tai","Southwestern Tai","Southwestern Thai PH","Lao-Thai"],"Pruned Language Families":"Tai-Kadai, Kam-Tai, Daic-Beic, Daic, Central-Southwestern Tai, Wenma-Southwestern Tai, Sapa-Southwestern Tai, Southwestern Tai, Southwestern Thai PH, Lao-Thai"},
    "lt":{"Language":"Lithuanian","Language Families":["Indo-European","Classical Indo-European","Balto-Slavic","Eastern Baltic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Balto-Slavic, Eastern Baltic"},
    "lv":{"Language":"Latvian","Language Families":["Indo-European","Classical Indo-European","Balto-Slavic","Eastern Baltic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Balto-Slavic, Eastern Baltic"},
    "mg":{"Language":"Malagasy","Language Families":["Austronesian","Malayo-Polynesian","Basap-Greater Barito","Greater Barito linkage","Southeast Barito"],"Pruned Language Families":"Austronesian, Malayo-Polynesian"},
    "mi":{"Language":"Maori","Language Families":["Austronesian","Malayo-Polynesian","Eastern Malayo-Polynesian","Oceanic","Central Pacific linkage","Tokalau Fijian","Polynesian","Nuclear Polynesian","Northern Outlier Polynesian-East Polynesian","Solomons Northern Outlier Polynesian-East Polynesian","Central Northern Outlier Polynesian-East Polynesian","East Polynesian","East Polynesian Proximal","South East Polynesian Proximal","Maoric"],"Pruned Language Families":"Austronesian, Malayo-Polynesian, Eastern Malayo-Polynesian, Oceanic, Central Pacific linkage, Tokalau Fijian, Polynesian, Nuclear Polynesian, Central Northern Outlier Polynesian-East Polynesian, East Polynesian, East Polynesian Proximal"},
    "mk":{"Language":"Macedonian","Language Families":["Indo-European","Classical Indo-European","Balto-Slavic","Slavic","South Slavic","Eastern South Slavic","Macedo-Bulgarian"],"Pruned Language Families":"Indo-European, Classical Indo-European, Balto-Slavic, Slavic, South Slavic, Eastern South Slavic, Macedo-Bulgarian"},
    "ml":{"Language":"Malayalam","Language Families":["Dravidian","South Dravidian","South Dravidian I","Tamil-Kannada","Tamil-Kota","Tamil-Toda","Tamil-Irula","Tamil-Kodagu","Tamil-Malayalam","Malayamaloid"],"Pruned Language Families":"Dravidian, South Dravidian, South Dravidian I, Tamil-Kannada, Tamil-Kota, Tamil-Toda, Tamil-Irula, Tamil-Kodagu, Tamil-Malayalam"},
    "mn":{"Language":"Mongolian","Language Families":["Mongolic-Khitan","Mongolic","Eastern Mongolic","Khalkha-Buriat"],"Pruned Language Families":"Mongolic-Khitan"},
    "mr":{"Language":"Marathi","Language Families":["Indo-European","Classical Indo-European","Indo-Iranian","Indo-Aryan","Middle-Modern Indo-Aryan","Continental Indo-Aryan","Indo-Aryan Southern zone","Marathic","Marathi-Konkani","Old-Modern Marathi","Modern Marathi"],"Pruned Language Families":"Indo-European, Classical Indo-European, Indo-Iranian, Indo-Aryan, Middle-Modern Indo-Aryan, Continental Indo-Aryan"},
    "ms":{"Language":"Malay","Language Families":["Austronesian","Malayo-Polynesian","Malayo-Chamic","Malayic","Nuclear Malayic","Standard Malay-Indonesian"],"Pruned Language Families":"Austronesian, Malayo-Polynesian, Malayo-Chamic, Malayic, Nuclear Malayic, Standard Malay-Indonesian"},
    "mt":{"Language":"Maltese","Language Families":["Afro-Asiatic","Semitic","West Semitic","Central Semitic","Arabian","Arabic","North African Arabic","Malta-Tunisian Arabic"],"Pruned Language Families":"Afro-Asiatic, Semitic, West Semitic, Central Semitic, Arabian, Arabic"},
    "my":{"Language":"Burmese","Language Families":["Sino-Tibetan","Burmo-Qiangic","Lolo-Burmese","Burmish","Southern Burmish","Mranmaic","Nuclear Mranmaic"],"Pruned Language Families":"Sino-Tibetan"},
    "ne":{"Language":"Nepali","Language Families":["Indo-European","Classical Indo-European","Indo-Iranian","Indo-Aryan","Middle-Modern Indo-Aryan","Continental Indo-Aryan","Midlands Indo-Aryan","Indo-Aryan Northern zone","Eastern Pahari"],"Pruned Language Families":"Indo-European, Classical Indo-European, Indo-Iranian, Indo-Aryan, Middle-Modern Indo-Aryan, Continental Indo-Aryan, Midlands Indo-Aryan"},
    "nl":{"Language":"Dutch","Language Families":["Indo-European","Classical Indo-European","Germanic","Northwest Germanic","West Germanic","Macro-Dutch","Middle-Modern Dutch","Modern Dutch","Global Dutch"],"Pruned Language Families":"Indo-European, Classical Indo-European, Germanic, Northwest Germanic, West Germanic, Macro-Dutch, Middle-Modern Dutch, Modern Dutch, Global Dutch"},
    "nn":{"Language":"Norwegian Nynorsk","Language Families":["Indo-European","Classical Indo-European","Germanic","Northwest Germanic","North Germanic","West Scandinavian","Norwegian"],"Pruned Language Families":"Indo-European, Classical Indo-European, Germanic, Northwest Germanic, North Germanic, West Scandinavian, Norwegian"},
    "no":{"Language":"Norwegian","Language Families":["Indo-European","Classical Indo-European","Germanic","Northwest Germanic","North Germanic","West Scandinavian","Norwegian"],"Pruned Language Families":"Indo-European, Classical Indo-European, Germanic, Northwest Germanic, North Germanic, West Scandinavian, Norwegian"},
    "oc":{"Language":"Occitan","Language Families":["Indo-European","Classical Indo-European","Italic","Latino-Faliscan","Latinic","Imperial Latin","Romance","Italo-Western Romance","Western Romance","Shifted Western Romance","Southwestern Shifted Romance","Occitanic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Italic, Latino-Faliscan, Latinic, Imperial Latin, Romance, Italo-Western Romance, Western Romance, Shifted Western Romance, Southwestern Shifted Romance"},
    "pa":{"Language":"Panjabi","Language Families":["Indo-European","Classical Indo-European","Indo-Iranian","Indo-Aryan","Middle-Modern Indo-Aryan","Continental Indo-Aryan","Indo-Aryan Northwestern zone","Sindhi-Lahnda","Greater Panjabic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Indo-Iranian, Indo-Aryan, Middle-Modern Indo-Aryan, Continental Indo-Aryan, Indo-Aryan Northwestern zone, Sindhi-Lahnda"},
    "pl":{"Language":"Polish","Language Families":["Indo-European","Classical Indo-European","Balto-Slavic","Slavic","West Slavic","Lechitic","Polish-Silesian"],"Pruned Language Families":"Indo-European, Classical Indo-European, Balto-Slavic, Slavic, West Slavic"},
    "ps":{"Language":"Pushto","Language Families":["Indo-European","Classical Indo-European","Indo-Iranian","Iranian","Pashto","Nuclear Pashto"],"Pruned Language Families":"Indo-European, Classical Indo-European, Indo-Iranian, Iranian"},
    "pt":{"Language":"Portuguese","Language Families":["Indo-European","Classical Indo-European","Italic","Latino-Faliscan","Latinic","Imperial Latin","Romance","Italo-Western Romance","Western Romance","Shifted Western Romance","Southwestern Shifted Romance","West Ibero-Romance","Galician Romance","Macro-Portuguese","Brazil-Portugal Portuguese"],"Pruned Language Families":"Indo-European, Classical Indo-European, Italic, Latino-Faliscan, Latinic, Imperial Latin, Romance, Italo-Western Romance, Western Romance, Shifted Western Romance, Southwestern Shifted Romance, West Ibero-Romance, Galician Romance"},
    "ro":{"Language":"Romanian","Language Families":["Indo-European","Classical Indo-European","Italic","Latino-Faliscan","Latinic","Imperial Latin","Romance","Eastern Romance","Northern Romanian","Eastern Romanian"],"Pruned Language Families":"Indo-European, Classical Indo-European, Italic, Latino-Faliscan, Latinic, Imperial Latin, Romance"},
    "ru":{"Language":"Russian","Language Families":["Indo-European","Classical Indo-European","Balto-Slavic","Slavic","East Slavic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Balto-Slavic, Slavic, East Slavic"},
    "sa":{"Language":"Sanskrit","Language Families":["Indo-European","Classical Indo-European","Indo-Iranian","Indo-Aryan"],"Pruned Language Families":"Indo-European, Classical Indo-European, Indo-Iranian, Indo-Aryan"},
    "sco":{"Language":"Scots","Language Families":["Indo-European","Classical Indo-European","Germanic","Northwest Germanic","West Germanic","North Sea Germanic","Anglo-Frisian","Anglic","Later Anglic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Germanic, Northwest Germanic, West Germanic, North Sea Germanic, Anglo-Frisian, Anglic, Later Anglic"},
    "sd":{"Language":"Sindhi","Language Families":["Indo-European","Classical Indo-European","Indo-Iranian","Indo-Aryan","Middle-Modern Indo-Aryan","Continental Indo-Aryan","Indo-Aryan Northwestern zone","Sindhi-Lahnda","Sindhic","Sindhi-Kachchi"],"Pruned Language Families":"Indo-European, Classical Indo-European, Indo-Iranian, Indo-Aryan, Middle-Modern Indo-Aryan, Continental Indo-Aryan, Indo-Aryan Northwestern zone, Sindhi-Lahnda"},
    "si":{"Language":"Sinhala","Language Families":["Indo-European","Classical Indo-European","Indo-Iranian","Indo-Aryan","Middle-Modern Indo-Aryan","Dhivehi-Sinhala","Sinhalaic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Indo-Iranian, Indo-Aryan, Middle-Modern Indo-Aryan"},
    "sk":{"Language":"Slovak","Language Families":["Indo-European","Classical Indo-European","Balto-Slavic","Slavic","West Slavic","Czech-Slovak"],"Pruned Language Families":"Indo-European, Classical Indo-European, Balto-Slavic, Slavic, West Slavic, Czech-Slovak"},
    "sl":{"Language":"Slovenian","Language Families":["Indo-European","Classical Indo-European","Balto-Slavic","Slavic","South Slavic","Western South Slavic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Balto-Slavic, Slavic, South Slavic, Western South Slavic"},
    "sn":{"Language":"Shona","Language Families":["Atlantic-Congo","Volta-Congo","Benue-Congo","Bantoid","Southern Bantoid","Narrow Bantu","East Bantu","Southern Bantu","Shona (S.10)","Core Shona","Plateau Shona","Central Shona"],"Pruned Language Families":"Atlantic-Congo, Volta-Congo, Benue-Congo, Bantoid, Southern Bantoid, Narrow Bantu, East Bantu"},
    "so":{"Language":"Somali","Language Families":["Afro-Asiatic","Cushitic","East Cushitic","Lowloand East Cushitic","Southern Lowland East Cushitic","Mainstream Lowland East Cushitic","Omo-Tana","Eastern Omo-Tana","Somali"],"Pruned Language Families":"Afro-Asiatic"},
    "sq":{"Language":"Albanian","Language Families":["Indo-European","Classical Indo-European"],"Pruned Language Families":"Indo-European, Classical Indo-European"},
    "sr":{"Language":"Serbian","Language Families":["Indo-European","Classical Indo-European","Balto-Slavic","Slavic","South Slavic","Western South Slavic","Serbian-Croatian-Bosnian"],"Pruned Language Families":"Indo-European, Classical Indo-European, Balto-Slavic, Slavic, South Slavic, Western South Slavic, Serbian-Croatian-Bosnian"},
    "su":{"Language":"Sundanese","Language Families":["Austronesian","Malayo-Polynesian"],"Pruned Language Families":"Austronesian, Malayo-Polynesian"},
    "sv":{"Language":"Swedish","Language Families":["Indo-European","Classical Indo-European","Germanic","Northwest Germanic","North Germanic","North Scandinavian","East-Central Swedic","East Swedic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Germanic, Northwest Germanic, North Germanic"},
    "sw":{"Language":"Swahili","Language Families":["Atlantic-Congo","Volta-Congo","Benue-Congo","Bantoid","Southern Bantoid","Narrow Bantu","East Bantu","Northeast Savanna Bantu","Coastal NEC Bantu","Sabaki-Swahili","Swahili (G.40)","Mombasa-Lamu-Inland Swahili"],"Pruned Language Families":"Atlantic-Congo, Volta-Congo, Benue-Congo, Bantoid, Southern Bantoid, Narrow Bantu, East Bantu"},
    "ta":{"Language":"Tamil","Language Families":["Dravidian","South Dravidian","South Dravidian I","Tamil-Kannada","Tamil-Kota","Tamil-Toda","Tamil-Irula","Tamil-Kodagu","Tamil-Malayalam","Tamiloid","Tamil-Paliyan"],"Pruned Language Families":"Dravidian, South Dravidian, South Dravidian I, Tamil-Kannada, Tamil-Kota, Tamil-Toda, Tamil-Irula, Tamil-Kodagu, Tamil-Malayalam"},
    "te":{"Language":"Telugu","Language Families":["Dravidian","South Dravidian","South Dravidian II","Telugic"],"Pruned Language Families":"Dravidian, South Dravidian"},
    "tg":{"Language":"Tajik","Language Families":["Indo-European","Classical Indo-European","Indo-Iranian","Iranian","Southwestern Iranian","Middle-Modern Persian","Modern Southwestern Iranian","Farsic-Caucasian Tat","Farsic","Eastern Farsic","Tajikic"],"Pruned Language Families":"Indo-European, Classical Indo-European, Indo-Iranian, Iranian, Modern Southwestern Iranian, Farsic-Caucasian Tat, Farsic"},
    "th":{"Language":"Thai","Language Families":["Tai-Kadai","Kam-Tai","Daic-Beic","Daic","Central-Southwestern Tai","Wenma-Southwestern Tai","Sapa-Southwestern Tai","Southwestern Tai","Southwestern Thai PH","Lao-Thai"],"Pruned Language Families":"Tai-Kadai, Kam-Tai, Daic-Beic, Daic, Central-Southwestern Tai, Wenma-Southwestern Tai, Sapa-Southwestern Tai, Southwestern Tai, Southwestern Thai PH, Lao-Thai"},
    "tk":{"Language":"Turkmen","Language Families":["Turkic","Common Turkic","Oghuz","Nuclear Oghuz","East Oghuz"],"Pruned Language Families":"Turkic, Common Turkic, Oghuz, Nuclear Oghuz"},
    "tl":{"Language":"Tagalog","Language Families":["Austronesian","Malayo-Polynesian","Greater Central Philippine","Central Philippine","Tagalogic","Tagalog-Filipino"],"Pruned Language Families":"Austronesian, Malayo-Polynesian, Greater Central Philippine, Central Philippine"},
    "tr":{"Language":"Turkish","Language Families":["Turkic","Common Turkic","Oghuz","Nuclear Oghuz","West Oghuz"],"Pruned Language Families":"Turkic, Common Turkic, Oghuz, Nuclear Oghuz"},
    "tt":{"Language":"Tatar","Language Families":["Turkic","Common Turkic","Kipchak-Turkestan","Kipchak","Northwest Kipchak","North Kipchak","Bashkiric"],"Pruned Language Families":"Turkic, Common Turkic, Kipchak-Turkestan, Kipchak, Northwest Kipchak, North Kipchak, Bashkiric"},
    "uk":{"Language":"Ukrainian","Language Families":["Indo-European","Classical Indo-European","Balto-Slavic","Slavic","East Slavic","Ukrainian-Rusyn"],"Pruned Language Families":"Indo-European, Classical Indo-European, Balto-Slavic, Slavic, East Slavic"},
    "ur":{"Language":"Urdu","Language Families":["Indo-European","Classical Indo-European","Indo-Iranian","Indo-Aryan","Middle-Modern Indo-Aryan","Continental Indo-Aryan","Midlands Indo-Aryan","Shaurasenic","Indo-Aryan Central zone","Western Hindi","Hindustani"],"Pruned Language Families":"Indo-European, Classical Indo-European, Indo-Iranian, Indo-Aryan, Middle-Modern Indo-Aryan, Continental Indo-Aryan, Midlands Indo-Aryan, Shaurasenic, Indo-Aryan Central zone, Western Hindi, Hindustani"},
    "uz":{"Language":"Uzbek","Language Families":["Turkic","Common Turkic","Kipchak-Turkestan","Turkestan","Modern Turkestan","Uzbek"],"Pruned Language Families":"Turkic, Common Turkic, Kipchak-Turkestan"},
    "vi":{"Language":"Vietnamese","Language Families":["Austroasiatic","Vietic","Viet-Muong"],"Pruned Language Families":"Austroasiatic"},
    "war":{"Language":"Waray","Language Families":["Austronesian","Malayo-Polynesian","Greater Central Philippine","Central Philippine","Bisayan","Central Bisayan","Warayan","Samar-Waray"],"Pruned Language Families":"Austronesian, Malayo-Polynesian, Greater Central Philippine, Central Philippine, Bisayan"},
    "yi":{"Language":"Yiddish","Language Families":["Indo-European","Classical Indo-European","Germanic","Northwest Germanic","West Germanic","High German","Middle German","East Middle German","Schlesisch-Wilmesau"],"Pruned Language Families":"Indo-European, Classical Indo-European, Germanic, Northwest Germanic, West Germanic, High German, Middle German"},
    "yo":{"Language":"Yoruba","Language Families":["Atlantic-Congo","Benue-Congo- Volta-Congo","Defoid","Yoruboid","Edekiri","Ede","Eastern Ede","Southeastern Ede","Nuclear Yoruba","Lucumi-Yoruba"],"Pruned Language Families":"Atlantic-Congo"},
    "zh":{"Language":"Mandarin Chinese","Language Families":["Sino-Tibetan","Sinitic","Classical-Middle-Modern Sinitic","Middle-Modern Sinitic","Northern Chinese","Mandarinic"],"Pruned Language Families":"Sino-Tibetan"}
}